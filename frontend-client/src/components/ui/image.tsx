import * as React from "react";
import { cn } from "@/lib/utils";

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, ...props }, ref) => (
    <img
      ref={ref}
      className={cn("rounded-md object-cover", className)}
      {...props}
    />
  )
);

Image.displayName = "Image";

export {Image};
