'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const steps = [
  {
    number: 1,
    title: "You Upload Your Music",
    description: "Upload your tracks, music and beats to Distrokid. If you are just trying to buy songs, simply sign up for Distrokid "
  },
  {
    number: 2,
    title: "Find a buyer/seller",
    description: "Once a price has been negoiated for a song, or bought directly from Lunar Boom, 100% of the splits from Distrokid revenues will be transfered to the buyer."
  },
  {
    number: 3,
    title: "You Get Paid",
    description: "Every time the song you bought gets streamed or your music is downloaded, you get paid. Since you now own 100% of the songs split, all the future revenue of the song now belongs to you"
  }
]

const faqs = [
  {
    question: "How much does it cost to sell/buy music?",
    answer: "Our pricing is transparent and affordable. A 5% fee will be added to each purchase and sale so we can keep running our services."
  },
  {
    question: "How long does it take to earn revenue from newly bought songs?",
    answer: "Typically, it takes 24-48 hours. However, this depends on how quickly Distrokids can arrange the splits. Furthermore, your song has to be making revenue for anything to be transferable."
  },
  {
    question: "Do I keep all rights to my music?",
    answer: "You retain 100% of your rights to the songs revenue. The song will still be under the name of its original artist and this can not be changed. "
  },
  {
    question: "Can I sell cover songs?",
    answer: "Yes, you can sell cover songs. However, you will need to obtain a mechanical license for each cover song you want to distribute. We can help you with this process."
  }
]

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div 
      className="border-b border-purple-300 py-4"
      initial={false}
      animate={{ backgroundColor: isOpen ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0)" }}
      transition={{ duration: 0.3 }}
    >
      <button
        className="w-full text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-xl font-semibold mb-2 flex justify-between items-center">
          {question}
          <svg
            className={`w-6 h-6 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </h3>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="text-gray-300"
          >
            {answer}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const MusicSellingSteps: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-zinc-700 to-zinc-900 text-white py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          How to Sell <span className="text-yellow-400">Your Music</span>
        </motion.h2>
        <motion.p 
          className="text-xl mb-12 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          It is never been easier to get your music to stores and streaming services. Now it is also easier than ever to sell/buy music. Follow these easy steps to get started:
        </motion.p>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <motion.div 
              key={step.number}
              className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
            >
              <div className="flex items-center mb-4">
                <span className="text-4xl font-bold text-yellow-400 mr-4">{step.number}</span>
                <h3 className="text-2xl font-semibold">{step.title}</h3>
              </div>
              <p className="text-gray-300">{step.description}</p>
            </motion.div>
          ))}
        </div>
        <motion.div 
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <a 
            href="/make-account" 
            className="bg-yellow-400 text-purple-900 px-8 py-3 rounded-full font-bold text-lg hover:bg-yellow-300 transition duration-300"
          >
            Start Selling Your Music
          </a>
        </motion.div>

        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Frequently Asked Questions
        </motion.h2>
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default MusicSellingSteps