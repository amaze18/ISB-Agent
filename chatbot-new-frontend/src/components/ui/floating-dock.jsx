
import React from "react";
import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog"


export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName
}) => {
  return (<>
    <FloatingDockDesktop items={items} className={desktopClassName} />
    {/* <FloatingDockMobile items={items} className={mobileClassName} /> */}
  </>);
};


const FloatingDockDesktop = ({
  items,
  className
}) => {
  let mouseX = useMotionValue(Infinity);
  return (
    (<motion.div
      suppressContentEditableWarning
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto flex h-16 gap-4 items-end rounded-2xl bg-gray-50 dark:bg-neutral-900 px-4 pb-3",
        className
      )}>
      {items.map((item) => (
        <IconContainer mouseX={mouseX} {...item} />
      ))}
    </motion.div>)
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
  component,
}) {
  let ref = useRef(null);
  const [open, setOpen] = useState(false);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });
  // / Change from [-150, 0, 150], [40, 80, 40] to:
  let widthTransform = useTransform(distance, [-150, 0, 150], [40, 50, 40]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [40, 50, 40]);

  // Change from [-150, 0, 150], [20, 40, 20] to:
  let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 25, 20]);
  let heightTransformIcon = useTransform(distance, [-150, 0, 150], [20, 25, 20]);

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 100,
    damping: 12,
  });

  let widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  return (
    (<Link href={href}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <motion.div
            ref={ref}
            style={{ width, height }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="aspect-square rounded-full bg-gray-200 dark:bg-neutral-800 flex items-center justify-center relative">
            <AnimatePresence>
              {hovered && (
                <motion.div
                  initial={{ opacity: 0, y: 10, x: "-50%" }}
                  animate={{ opacity: 1, y: 0, x: "-30%" }}
                  exit={{ opacity: 0, y: 2, x: "-50%" }}
                  className="px-2 py-0.5 whitespace-pre rounded-md bg-gray-100 border dark:bg-neutral-800 dark:border-neutral-900 dark:text-white border-gray-200 text-neutral-700 absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs ml-[-8px]">
                  {title}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              style={{ width: widthIcon, height: heightIcon }}
              className="flex items-center justify-center">
              {icon}
            </motion.div>
          </motion.div>
        </DialogTrigger>
        <DialogContent className="">
          <DialogHeader>
            {/* <DialogTitle>{title}</DialogTitle> */}
            <DialogDescription>
            </DialogDescription>
          </DialogHeader>
          {React.cloneElement(component, { onClose: () => setOpen(false) })}
        </DialogContent>
      </Dialog>
    </Link>)
  );
}
