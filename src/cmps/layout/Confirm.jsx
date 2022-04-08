import reactDom from "react-dom"
import { BsShieldExclamation } from 'react-icons/bs'
import { motion } from "framer-motion"

export const Confirm = ({ onDecision, message, message2, acceptText, declineText }) => {

    return reactDom.createPortal(
        <div className="confirm">
            <motion.div className="overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
            >
            </motion.div>
            <motion.div className="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                <BsShieldExclamation className="icon" />
                <p>{message}</p>
                {message2 && <p>{message2}</p>}
                <div className="actions">
                    <button className="btn-accept" onClick={() => onDecision(true)}>{acceptText}</button>
                    <button className="btn-decline" onClick={() => onDecision(false)}>{declineText}</button>
                </div>
            </motion.div>
        </div>, document.getElementById('portal')
    )
}