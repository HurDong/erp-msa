"use client"

import { motion } from "framer-motion"

export function BackgroundDecorations() {
  return (
    <>
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="pointer-events-none fixed left-[-100px] top-[-100px] -z-10 h-[600px] w-[600px] rounded-full bg-cyan-500/30 blur-[100px]"
        style={{ mixBlendMode: "screen" }}
      />

      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -60, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 18,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
        className="pointer-events-none fixed right-[-100px] top-[-100px] -z-10 h-[500px] w-[500px] rounded-full bg-purple-500/30 blur-[100px]"
        style={{ mixBlendMode: "screen" }}
      />

      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          x: [0, 30, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 4,
        }}
        className="pointer-events-none fixed bottom-[-100px] right-[-150px] -z-10 h-[550px] w-[550px] rounded-full bg-pink-500/30 blur-[100px]"
        style={{ mixBlendMode: "screen" }}
      />

      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          x: [0, -40, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 22,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 6,
        }}
        className="pointer-events-none fixed bottom-[-100px] left-[-100px] -z-10 h-[500px] w-[500px] rounded-full bg-fuchsia-500/30 blur-[100px]"
        style={{ mixBlendMode: "screen" }}
      />

      <motion.div
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 30,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.08]"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <motion.div
        animate={{
          backgroundPosition: ["0% 0%", "0% 100%"],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(0deg, transparent 50%, rgba(0, 255, 255, 0.3) 50%)",
          backgroundSize: "100% 4px",
        }}
      />
    </>
  )
}
