import * as React from "react";
import { useMarkdownRendererProps } from "./types";
import Image, { ImageProps } from "next/image";
import Zoom from "react-medium-image-zoom";
import { getFullRelativePath } from "utils/url-paths";

export const getMedia = ({ serverPath }: useMarkdownRendererProps) => {
  return {
    img: (imgProps: unknown) => {
      const { src, ...props2 } = imgProps as ImageProps;
      let srcStr = getFullRelativePath(...serverPath, src as string); // ImageProps isn't _quite_ right for our usg here

      const htmlProps = imgProps as Record<string, any>;
      const noZoomProp = htmlProps["data-nozoom"] ?? htmlProps?.dataset?.nozoom;
      const shouldZoom = noZoomProp ? noZoomProp === "false" : true;

      const ZoomComp = shouldZoom
        ? Zoom
        : ((({ children }) => <>{children}</>) as React.FC);

      // only "fill" is supported when height and width are not specified
      const beResponsive = !!(props2.height && props2.width);

      return (
        <ZoomComp>
          <Image
            src={srcStr}
            {...props2}
            layout={beResponsive ? "intrinsic" : "fill"}
            loading="lazy"
          />
        </ZoomComp>
      );
    },
    video: (props: React.VideoHTMLAttributes<HTMLVideoElement>) => {
      const { src, ...rest } = props;
      const srcStr = getFullRelativePath(...serverPath, src || "");
      return (
        <video
          muted={true}
          autoPlay={true}
          controls={true}
          loop={true}
          width="100%"
          height="auto"
          {...rest}
          src={srcStr}
        />
      );
    },
  };
};
