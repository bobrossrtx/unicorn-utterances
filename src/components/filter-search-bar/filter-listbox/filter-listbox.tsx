/**
 * This is a hand-spun component to match the guidelines for a listbox ALA w3 guidelines
 * @see https://www.w3.org/TR/wai-aria-practices/examples/listbox/listbox-collapsible.html
 *
 * ✅ Escape - Collapse the dropdown
 * ✅ Up - Focus previous item
 * ✅ Down - Focus next item
 * ✅ Home - Goes to first item
 * ✅ End - Goes to last item
 * ✅ Space - Toggles selection of item
 * ✅ Shift + Down - Focuses and selects next item
 * ✅ Shift + Up - Focuses and selects previous item
 * ✅ Ctrl + Shift + Home - Selects from the focused option to start of list
 * ✅ Ctrl + Shift + End - Selects from the focused option to end of list
 * ✅ Ctrl + A - Toggles selection of all
 * ✅ Click outside this component to close
 * ✅ Close on `blur`
 */

/**
 * "Filters"
 * Click to expand
 * Clicking filters won't do anything
 * After not expanded, show the filters by animating away "filters"
 * If nothing is selected, don't animate away "Filters"
 */

import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import classNames from "classnames";
import { motion, Variants } from "framer-motion";

import filterStyles from "./filter-listbox.module.scss";

import FilterIcon from "assets/icons/filter.svg";
import CheckIcon from "assets/icons/check.svg";
import UncheckIcon from "assets/icons/unchecked.svg";

import {
  usePopoverCombobox,
  UseSelectableArrayInternalVal,
} from "batteries-not-included/react/a11y";
import { SearchAndFilterContext } from "uu-constants";
import { useElementBounds } from "uu-utils";
import { PostListContext } from "constants/post-list-context";

interface FilterListItemProps {
  tag: UseSelectableArrayInternalVal;
  index: number;
  active: UseSelectableArrayInternalVal;
  expanded: boolean;
  selectIndex: (i: number, e: any, type: string) => void;
}
const FilterListItem = ({
  tag,
  index,
  active,
  expanded,
  selectIndex,
}: FilterListItemProps) => {
  const liClassName = classNames(filterStyles.option, {
    [filterStyles.active]: active.index === index,
    [filterStyles.selected]: tag.selected,
    [filterStyles.expanded]: expanded,
  });
  return (
    <li
      className={liClassName}
      role="option"
      onClick={(e) => expanded && selectIndex(index, e, e.type)}
      id={tag.id as string}
      aria-selected={tag.selected}
    >
      {tag.selected ? <CheckIcon /> : <UncheckIcon />}
      <span>{tag.val}</span>
    </li>
  );
};

const FilterDisplaySpan = ({
  children,
  ...props
}: React.ComponentProps<typeof motion.span>) => {
  const variants: Variants = {
    initial: (target) => ({
      width: target.width || 0,
      height: target.height,
    }),
  };

  return (
    <motion.span
      {...props}
      variants={variants}
      animate={"initial"}
      transition={{ ease: "linear", duration: 0.2 }}
    >
      {children}
    </motion.span>
  );
};

const ListIdBox = React.forwardRef<any, React.ComponentProps<typeof motion.ul>>(
  ({ children, ...props }, ref) => {
    const variants: Variants = {
      expanded: {
        height: "auto",
      },
      hidden: (target) => ({
        height: target,
      }),
    };

    return (
      <motion.ul
        {...props}
        variants={variants}
        transition={{ ease: "linear", duration: 0.2 }}
        ref={ref}
      >
        {children}
      </motion.ul>
    );
  }
);

ListIdBox.displayName = "ListIdBox";

interface FilterListboxProps {
  className?: string;
}
export const FilterListbox = ({ className }: FilterListboxProps) => {
  const { postTags } = React.useContext(PostListContext);

  const { setFilterVal } = useContext(SearchAndFilterContext);

  const {
    comboBoxListRef,
    active,
    values,
    selected,
    selectIndex,
    expanded,
    usedKeyboardLast,
    parentRef,
    buttonProps,
  } = usePopoverCombobox<string>(postTags);

  // Set the selected array value to match the parent combobox
  useEffect(() => setFilterVal(selected), [selected, setFilterVal]);

  // Should it show the text "filter" or the selected text
  const shouldShowFilterMsg = expanded || !selected.length;

  // What should the selected text show
  const selectedString = useMemo(() => {
    if (!selected.length) return "";
    return selected.map((v) => v.val).join(", ");
  }, [selected]);

  /**
   * Refs
   */
  // Set the node reference for the button for focusing
  const [buttonNode, setButtonNode] = useState<HTMLElement>();
  // Get a callback reference to get the element bounds
  const {
    ref: elBoundsCBRef,
    val: { height: buttonHeight },
  } = useElementBounds([]);
  // Create a callback reference to compose both the callback bound ref and the "real" ref
  const btnCallbackRef = useCallback(
    (node) => {
      elBoundsCBRef(node);
      setButtonNode(node);
    },
    [elBoundsCBRef, setButtonNode]
  );

  /**
   * Effects
   */
  useEffect(() => {
    // When user escapes using "Esc" key, refocus on btn
    if (!expanded && usedKeyboardLast && buttonNode) {
      buttonNode.focus();
    }
  }, [expanded, usedKeyboardLast, buttonNode]);

  /**
   * The bounding box handlers
   */
  // Get the width of just displaying "Filter"
  const {
    ref: getFilterStrWidthFromRef,
    val: { width: filterStrWidth, height: filterStrHeight },
  } = useElementBounds([]);
  // Get the width of the "selected" value string in order to set the box
  // width to it for an animation effect
  const {
    ref: getSelectedStrWidthFromRef,
    val: { width: selectedStrWidth },
  } = useElementBounds([selected]);
  // Get the top level container width so we can set it as a max width for the
  // selected string span so we can cut it with `...` properly
  const {
    ref: getContainerWidthFromRef,
    val: { width: topLevelContainerWidth },
  } = useElementBounds([]);

  // Set that max width value mentioned above but add some padding for the btn
  const maxSelectedStrWidth = `${topLevelContainerWidth - 72}px`;

  const filterContentsWidth =
    // If there is nothing selected, then it should be the width of the filter str
    shouldShowFilterMsg
      ? // If it's expanded, let's add some breathing room of 100px to see the filters
        expanded
        ? filterStrWidth + 100
        : filterStrWidth
      : selectedStrWidth;

  /**
   * Classes
   */
  const containerClassName = classNames({
    [filterStyles.expanded]: expanded,
    [filterStyles.container]: true,
    [className || ""]: true,
  });

  const filterTextClasses = classNames({
    [filterStyles.show]: shouldShowFilterMsg,
    [filterStyles.placeholder]: true,
  });

  const filterIconClasses = classNames({
    expandedIcon: expanded,
    [filterStyles.icon]: true,
  });

  const listBoxClasses = classNames({
    [filterStyles.hasTags]: !!selected.length,
    [filterStyles.listbox]: true,
    [filterStyles.isKeyboard]: usedKeyboardLast,
  });

  const appliedStrClasses = classNames({
    [filterStyles.show]: !shouldShowFilterMsg,
    [filterStyles.appliedTags]: true,
  });

  return (
    <div className={containerClassName} ref={getContainerWidthFromRef as any}>
      <div className={filterStyles.buttonContainer} ref={parentRef as any}>
        <span id="exp_elem" className="visually-hidden">
          Choose a tag to filter by:
        </span>
        <button
          type="button"
          className={filterStyles.filterButton}
          aria-haspopup="listbox"
          aria-expanded={expanded}
          aria-labelledby="exp_elem filter-button"
          aria-owns="listBoxID"
          id="filter-button"
          ref={btnCallbackRef}
          {...buttonProps}
        >
          {<FilterIcon className={filterIconClasses} aria-hidden={true} />}
          <FilterDisplaySpan
            className={filterStyles.textContainer}
            custom={{ height: filterStrHeight, width: filterContentsWidth }}
          >
            <span
              aria-hidden={true}
              ref={getFilterStrWidthFromRef}
              className={filterTextClasses}
            >
              Filters
            </span>
            <span
              aria-hidden={true}
              ref={getSelectedStrWidthFromRef}
              className={appliedStrClasses}
              style={{
                maxWidth: maxSelectedStrWidth,
              }}
            >
              {selectedString}
            </span>
          </FilterDisplaySpan>
        </button>
        <ListIdBox
          id="listBoxID"
          role="listbox"
          ref={comboBoxListRef as any}
          className={listBoxClasses}
          aria-labelledby="exp_elem"
          tabIndex={-1}
          aria-hidden={!expanded}
          aria-multiselectable="true"
          aria-activedescendant={active ? (active.id as string) : ""}
          custom={buttonHeight}
          animate={expanded ? "expanded" : "hidden"}
        >
          <div className={filterStyles.filterListHideContainer}>
            <div className={filterStyles.spacer} />
            {values.map((tag, index) => (
              <FilterListItem
                tag={tag}
                key={tag.id}
                index={index}
                expanded={expanded}
                selectIndex={selectIndex}
                active={active}
              />
            ))}
          </div>
        </ListIdBox>
      </div>
    </div>
  );
};
