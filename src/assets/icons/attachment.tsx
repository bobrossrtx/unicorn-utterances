import React, { SVGProps, useRef } from "react";
import { genId } from "batteries-not-included/react/a11y";

export const Attachment = (props: Partial<SVGProps<any>>) => {
  const clipId = useRef<string>(`path-1-inside-1${genId()}`);

  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath={`url(#${clipId.current})`}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M24.6893 7.31065C23.0659 5.6873 20.4339 5.6873 18.8106 7.31066L8.06059 18.0607C5.33267 20.7886 5.33267 25.2114 8.06059 27.9393C10.7885 30.6673 15.2113 30.6673 17.9393 27.9393L30.4393 15.4393C31.0251 14.8535 31.9748 14.8535 32.5606 15.4393C33.1464 16.0251 33.1464 16.9749 32.5606 17.5607L20.0606 30.0607C16.1611 33.9602 9.83876 33.9601 5.93927 30.0607C2.03978 26.1612 2.03977 19.8388 5.93927 15.9393L16.6893 5.18934C19.4842 2.39441 24.0157 2.39441 26.8106 5.18933C29.6055 7.98426 29.6055 12.5157 26.8106 15.3107L16.0606 26.0606C14.3702 27.751 11.6296 27.751 9.93927 26.0607C8.24891 24.3703 8.24891 21.6297 9.93927 19.9393L19.9393 9.93933C20.5251 9.35355 21.4748 9.35355 22.0606 9.93933C22.6464 10.5251 22.6464 11.4749 22.0606 12.0607L12.0606 22.0607C11.5418 22.5794 11.5418 23.4205 12.0606 23.9393C12.5794 24.4581 13.4205 24.4581 13.9393 23.9393L24.6893 13.1893C26.3126 11.566 26.3126 8.93401 24.6893 7.31065Z"
          fill="#153E67"
        />
      </g>
      <defs>
        <clipPath id={clipId.current}>
          <rect width="36" height="36" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
