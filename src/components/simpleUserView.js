const SimpleUserView = ({user}) => {
  return(
    <div className={"simpleUserView"}>
      <p>{user.username}</p>
      <a href={"/user/view?id=" + user.id}>View Profile</a>
    </div>
  )
}
export default SimpleUserView;