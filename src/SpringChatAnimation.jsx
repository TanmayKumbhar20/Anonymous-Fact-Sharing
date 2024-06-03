
import {animate,motion} from 'framer-motion';

function SpringChatAnimation(){

    return(

        <motion.div 
            initial={{scale:0}}
        animate={{scale:1}}
        transition={{type:'spring', stiffness:40, delay:0}}
        >
        </motion.div>
        
    )
}

export default SpringChatAnimation;