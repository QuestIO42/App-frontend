interface OpenAnswerProps {
    title: string;
    description: string;
  }

export default function OpenAnswer({ title, description }:OpenAnswerProps){
    return(
        <>
            <h1>{title}</h1>
            <p>{description}</p>
            <form action="">
                <input type="text" name="" id="" />
            </form>
        </>
    )
}