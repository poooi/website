import { FC } from 'react'
import { motion } from 'framer-motion'

export const AnimatedContainer: FC<any> = ({ children, props }) => (
  <motion.div
    animate={{ y: [50, 0], opacity: [0, 1] }}
    transition={{ duration: 0.3 }}
    {...props}
  >
    {children}
  </motion.div>
)
