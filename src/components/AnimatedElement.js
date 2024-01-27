// AnimatedElement.js

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AnimatedElement = ({ children }) => {
    const [ref, inView] = useInView({
        triggerOnce: true, // Only trigger once
        threshold: 0.5, // 50% of the element is in view
    });

    return (
        <AnimatePresence>
            {inView && (
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AnimatedElement;
