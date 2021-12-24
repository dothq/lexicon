import { GetServerSideProps, GetStaticProps } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { Button } from "../../../components/Button/style"
import { Card } from "../../../components/Card/style"
import { CardHeader } from "../../../components/CardHeader/style"
import { CardSplitter } from "../../../components/CardSplitter/style"
import { Content } from "../../../components/Content/style"
import { Header } from "../../../components/Header"
import { Icon } from "../../../components/Icon/style"
import { IconButton } from "../../../components/IconButton"
import { SelectItem } from "../../../components/SelectItem"
import { TranslationArea } from "../../../components/TranslationArea"
import { flags } from "../../../util/flags"

const Home = ({ from, to }: { from: string, to: string }) => {
    const ref = React.createRef<HTMLTextAreaElement>();
    const [result, setResult] = React.useState("");

    const router = useRouter();

    return (
        <>
            <Header />
            <Content>
                <div style={{ display: "flex", gap: "0.8rem" }}>
                    {/* <Link href={"/"}>
                        <Button variant={"primary"}>
                            <Icon icon={"translate.svg"} />
                            Text
                        </Button>
                    </Link> */}

                    {/* <Link href={"/documents"}>
                        <Button variant={"secondary"}>
                            <Icon icon={"document.svg"} />
                            Documents
                        </Button>
                    </Link> */}
                </div>

                <Card>
                    <CardHeader>
                        <SelectItem flag={from} />
                        <IconButton icon={"swap.svg"} onClick={() => {
                            if(!ref) return;

                            router.push(`/${to}/${from}`)
                            
                            const fromValue = ref.current.value;
                            const toValue = result;

                            setResult(fromValue);
                            ref.current.value = toValue;
                        }}></IconButton>
                        <SelectItem flag={to} />
                    </CardHeader>
                    <CardSplitter>
                        <TranslationArea 
                            ref={ref}
                            from={from} 
                            to={to} 
                            result={result}
                            setResult={setResult}
                        />
                    </CardSplitter>
                </Card>

                {(
                    flags.find(f => f.code == from).flag == "🏴‍☠️" ||
                    flags.find(f => f.code == to).flag == "🏴‍☠️"
                ) ?
                    <a 
                        style={{ color: "#1662D3", fontSize: "0.9rem", fontWeight: 500, width: "max-content" }} 
                        href={"https://github.com/dothq/lexicon/blob/main/docs/why-does-this-language-have-the-wrong-flag.md"}
                        target={"_blank"}
                    >
                        Why does this language have the wrong flag?
                    </a>
                 : <></>}
            </Content>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    if(!flags.find(f => f.code == ctx.params.from)) return { notFound: true };
    if(!flags.find(f => f.code == ctx.params.to)) return { notFound: true };

    return { 
        props: {
            from: ctx.params.from,
            to: ctx.params.to
        } 
    }
}  

export default Home;