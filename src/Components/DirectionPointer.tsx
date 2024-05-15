type Props = {
    rotation: number;
    isCorrect?: boolean;
}

function DirectionPointer({ rotation, isCorrect = false }: Props){
    return (
        <div
            style={{
                width: "32px",
                height: "32px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            {
                isCorrect ?
                <p
                    style={{
                        fontSize: "24px",
                        margin: 0
                    }}
                >
                    &#x2714;
                </p> :
                <p
                    style={{
                        transform: `rotate(${rotation}rad)`,
                        fontSize: "24px",
                        margin: 0
                    }}
                >
                    &#x2191;
                </p>
            }
        </div>
    );
}

export default DirectionPointer;