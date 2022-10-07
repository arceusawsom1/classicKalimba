const ErrorBox = (props) => {
  let errorList=[];
  for (let a in props.errors){
    errorList.push(
      <p key={a}>{props.errors[a]}</p>
    )
  }
  let output;
  if (errorList.length>0){
    output = (
      <div className="ErrorBox">
        {errorList}
      </div>
    )
  }
  return(
    <>
      {output}
    </>
  )
}
export default ErrorBox;