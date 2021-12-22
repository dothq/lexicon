import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { Button } from "../components/Button/style"
import { Card } from "../components/Card/style"
import { CardHeader } from "../components/CardHeader/style"
import { CardSplitter } from "../components/CardSplitter/style"
import { Content } from "../components/Content/style"
import { Header } from "../components/Header"
import { Icon } from "../components/Icon/style"
import { Textarea } from "../components/Textarea/style" 
import axios from "axios";
import { IconButton } from "../components/IconButton"

const Home = () => {
    const [height, setHeight] = React.useState(5);
    const ref = React.createRef<HTMLTextAreaElement>();
    const [result, setResult] = React.useState("");
    const [translating, setTranslating] = React.useState(false);

    let debounceInt: any;

    const onKeyDown = (e: any) => {
        if(e.ctrlKey) return;

        let value = e.target.value;
        if(!value.length) return setResult("");

        if(e.code == "Space") return setResult(`${result} `);

        clearTimeout(debounceInt);

        if(!translating) {
            if(result.length) setResult(`${result} ...`);
            else setResult("Translating...");
        }
        setTranslating(true);

        debounceInt = setTimeout(async () => {
            try {
                const res = await axios.post(
                    "/api/translate", 
                    { from: "en", to: "es", input: value }
                )
    
                setResult(res.data.translation);
            } catch(e) {
                setResult("Failed to translate.");
            }

            setTranslating(false);
        }, 1000);
    }

    return (
        <>
            <Header />
            <Content>
                <div style={{ display: "flex", gap: "0.8rem" }}>
                    <Link href={"/"}>
                        <Button variant={"primary"}>
                            <Icon icon={"translate.svg"} />
                            Text
                        </Button>
                    </Link>

                    <Link href={"/documents"}>
                        <Button variant={"secondary"}>
                            <Icon icon={"document.svg"} />
                            Documents
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        
                    </CardHeader>
                    <CardSplitter>
                        <Textarea 
                            rows={height} 
                            ref={ref}
                            onKeyUp={(e) => onKeyDown(e)}
                        /> 
                        <div style={{ width: "100%", position: "relative", display: "flex" }}>
                            <Textarea 
                                rows={height} 
                                readOnly 
                                value={result}
                                placeholder={"Translation"}
                            /> 
                            <IconButton style={{ position: "absolute", left: "0", bottom: "0", margin: "1.5rem" }} icon={"speak.svg"} />
                            <IconButton style={{ position: "absolute", right: "0", bottom: "0", margin: "1.5rem" }} icon={"copy.svg"} />
                        </div>
                    </CardSplitter>
                </Card>
            </Content>
        </>
    )
}

export default Home;