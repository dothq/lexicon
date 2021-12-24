import axios from "axios";
import { useRouter } from "next/router";
import React from "react"
import { IconButton } from "../IconButton";
import { Textarea } from "../Textarea/style"

export const TranslationArea = React.forwardRef(({ from, to, result, setResult }: { from: string, to: string, result: any, setResult: any }, ref: any) => {
    const [translating, setTranslating] = React.useState(false);
    const [copied, setCopied] = React.useState(false);
    const [playing, setPlaying] = React.useState(false);
    const [audioTrack, setAudioTrack] = React.useState<any>();

    const router = useRouter();

    const updateURL = () => {
        const url = new URL(window.location.href);

        if(ref.current.value && ref.current.value.length) {
            url.searchParams.set("text", ref.current.value)
        } else {
            url.searchParams.delete("text")
        }

        router.replace(url);
    }

    let debounceInt: any;
    let copyInt: any;

    const onKeyDown = (e?: any) => {
        if(e && e.ctrlKey) return;
        if(!ref) return;

        clearTimeout(debounceInt);

        let value = ref.current.value;
        if(!value.length) return setResult("");

        if(!translating) {
            if(result && result.length) setResult(`${result} ...`);
            else setResult("Translating...");
        }
        setTranslating(true);

        debounceInt = setTimeout(async () => {
            // updateURL();

            try {
                const res = await axios.post(
                    "/api/translate", 
                    { from, to, input: value }
                )
    
                setResult(res.data.translation || "Failed to translate.");
            } catch(e) {
                setResult("Failed to translate.");
            }

            setTranslating(false);
        }, 2000);
    }

    const onCopyClick = () => {
        if(translating) return;

        clearTimeout(copyInt);
        setCopied(false);
        setCopied(true);
        navigator.clipboard.writeText(result);

        copyInt = setTimeout(() => {
            setCopied(false);
        }, 1000);
    }


    const onSynthesizeClick = async () => {
        if(translating) return;
        if(playing) {
            if(audioTrack) audioTrack.pause();
            setPlaying(false);
            setAudioTrack(null);
            return;
        }
        if(!ref.current.value.length) return;

        setPlaying(true);

        const play = (url: any) => {
            const audio = new Audio();
            setAudioTrack(audio);

            audio.src = url;
            audio.play();

            audio.addEventListener("play", () => setPlaying(true));
            audio.addEventListener("ended", () => setPlaying(false));
        }

        try {
            const res = await axios.post(
                "/api/synthesize", 
                { lang: to, input: result },
                { responseType: "blob" }
            )

            const blob = res.data;
            const url = window.URL.createObjectURL(blob);

            play(url);
        } catch(e) {}
    }

    return (
        <>
            <Textarea 
                rows={5} 
                ref={ref}
                spellCheck={false}
                autoFocus={true}
                onKeyUp={() => onKeyDown()}
            /> 
            <div style={{ width: "100%", position: "relative", display: "flex", flexDirection: "column", padding: "2rem" }}>
                <Textarea 
                    rows={5} 
                    readOnly 
                    value={result}
                    spellCheck={false}
                    placeholder={"Translation"}
                    style={{ padding: 0 }}
                /> 
                <div style={{ display: "flex", gap: "0.6rem" }}>
                    <IconButton 
                        icon={playing ? "stop.svg" : "speak.svg"} 
                        onClick={() => onSynthesizeClick()}
                    />
                    <IconButton 
                        icon={copied ? "check.svg" : "copy.svg"} 
                        onClick={() => onCopyClick()}
                    />
                </div>
            </div>
        </>
    )
})