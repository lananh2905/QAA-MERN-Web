
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

const Logo = () => {
    return (
        <div style={{
            display: 'flex',
            marginLeft: '20px',
            marginBottom: '20px',
            marginRight: 'auto',
            alignItems: 'center',
            gap: '15px',
        }}>
            <Link to="/">
                <img 
                    src="openai.png" 
                    alt="Logo" 
                    width= {"30px"}
                    height= {"30px"}
                    className='image-inverted'

                />
            </Link>

            <Typography sx={
                    {display: {
                        md:"block", 
                        sm: "none", 
                        xs: "none"
                    }, 
                    mr: "auto", 
                    fontWeight: "800", 
                    textShadow: "2px 2px 20px rgba(0, 0, 0, 0.3)"
                }}>

                    <span style={{ fontSize: "20px",}}>QUESTION & ASWERING</span> - FROM CONTEXT
            </Typography>

        </div>
    )
}

export default Logo;