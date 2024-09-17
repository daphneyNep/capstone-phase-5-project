import React from "react"

const MemberCard = ({ member: {membername, password}}) => {

  return (
      <li>
        <p>{password}</p>
        <p>{membername}</p>
      </li>
    )
}

export default MemberCard