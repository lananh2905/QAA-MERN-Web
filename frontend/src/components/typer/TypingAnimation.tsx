import { TypeAnimation } from 'react-type-animation';

const TypingAnimation = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        '',
        1000,
        'Hỏi đáp với văn bản của bạn',
        2000,
        'Build by ACDHT team 🙆',
        1500,
        'Model RoBERT-Large ☑️',
        1500
      ]}
      speed={50}
      style={{ 
        fontSize: '70px', 
        display: 'inline-block', 
        color: "white", 
        textShadow: "1px 1px 20px #000" 
      }}
      repeat={Infinity}
    />
  );
};

export default TypingAnimation;