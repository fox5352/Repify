import { motion, useAnimation } from "motion/react"
import { SignedIn, SignedOut, SignInButton, SignOutButton } from "@/ui/SignIn";

import { House } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

export default function AppBar({ links, mapper }: { links: { text: string, to: string }[], mapper: ({ text, to }: { text: string, to: string }, index: number) => ReactNode }) {
  // state
  const [isMenuActive, setIsMenuActive] = useState(false);
  // animation state
  const buttonControls = useAnimation()
  const navControls = useAnimation()
  const innerNavBox = useAnimation()
  // animation values
  const [lock, setLock] = useState(false);
  const durations = {
    fade: 0.15,
    button: 0.2,
    navExpand: 0.3,
    navCollapse1: 0.25,
    navCollapse2: 0.25,
  };
  const animationLock = Object.values(durations).reduce((prev, curr) => {
    return prev += curr
  }, 0);


  // Toggle function
  const toggle = () => {
    if (lock) return;

    setLock(true)

    setTimeout(() => {
      setLock(false)
    }, animationLock * 1000);
    setIsMenuActive(prev => !prev)
  };

  useEffect(() => {
    const runSequence = async () => {

      if (isMenuActive) {
        await innerNavBox.start({
          opacity: 0,
          transition: { duration: durations.fade }
        });

        await buttonControls.start({
          borderTopRightRadius: "20%",
          borderTopLeftRadius: "0%",
          borderBottomRightRadius: "20%",
          borderBottomLeftRadius: "0%",
          transition: { duration: durations.button }
        });

        navControls.set({ display: "flex" });

        await navControls.start({
          width: "3px",
          height: "auto"
        });

        await navControls.start({
          width: "100%",
          transition: { duration: durations.navExpand }
        });

        await innerNavBox.start({
          opacity: 1,
          transition: { duration: durations.fade }
        });

      } else {
        await innerNavBox.start({
          opacity: 0,
          transition: { duration: durations.fade }
        });

        await navControls.start({
          width: "3px",
          transition: { duration: durations.navCollapse1 }
        });

        await navControls.start({
          width: "3px",
          height: "0px",
          transition: { duration: durations.navCollapse2 }
        });

        await buttonControls.start({
          borderTopRightRadius: "100%",
          borderTopLeftRadius: "100%",
          borderBottomRightRadius: "100%",
          borderBottomLeftRadius: "100%",
          transition: { duration: durations.button }
        });
      }
    }

    runSequence()
  }, [isMenuActive])
  return (
    <div className="fixed right-0 bottom-4 md:hidden w-full py-4 px-2 flex flex-row-reverse" >
      <motion.button
        onClick={toggle}
        className="p-2 text-white bg-black border border-black"
        initial={{ borderRadius: "100%" }}
        animate={buttonControls}
      >
        <House />
      </motion.button>

      <motion.nav
        className="bg-black rounded-l-md overflow-hidden"
        initial={{ width: "0%", display: "none" }}
        animate={navControls}
      >
        <motion.div className="flex items-center w-full ml-1 my-1 border-2 border-white text-white rounded-md overflow-hidden" animate={innerNavBox}>
          {
            links.map(mapper)
          }
          <span className="py-1 px-2 duration-200 ease-linear active:bg-zinc-500">
            <SignedOut>
              <SignInButton>
                LogIn
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <SignOutButton>
                LogOut
              </SignOutButton>
            </SignedIn>
          </span>
        </motion.div>

      </motion.nav>
    </div>
  )
}
