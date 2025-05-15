import { TypeAnimation } from 'react-type-animation';

const TypingAnimation = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        '',
        1000,
        'Chat with your own AI 👽',
        2000,
        'Build by Lan Anh 🙆',
        1500,
        'Your own Customized DeepSeek ☑️',
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