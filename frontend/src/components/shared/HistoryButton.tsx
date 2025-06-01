import { Button } from "@mui/material";
import { grey } from "@mui/material/colors"

type Props = {
    text: string;
    onClick?: () => Promise<void>;
};

const HistoryButton = (props: Props) => {
    return (
                    <Button 
                        onClick={props.onClick}
                        sx={{
                        width: 1,
                        height: "40px",
                        mb: "10px", 
                        color:"white", 
                        fontWeight:"500", 
                        borderRadius: 3, 
                        mx: "auto",
                        fontSize: 13,
                        justifyContent: "flex-start",
                        ":hover": {
                            bgcolor: grey[700],
                        }
                    }}>
                        {props.text}
                    </Button>
    );
}
export default HistoryButton;