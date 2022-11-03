export default function ChatBox({ answer }) {

    return (
        <div style={{ color: 'black', marginBottom: '2rem', height: '500px', width: '500px', backgroundColor: 'lightgrey', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <h1>{answer}</h1>
        </div>
    )
}
