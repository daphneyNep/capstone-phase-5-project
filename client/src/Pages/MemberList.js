import React from "react";
import MemberCard from "../Components/Members/MemberCard"


const MemberList = ({ members, deleteMember }) => {
    return (
        <div>
            <h2>List of Members</h2>
            <ul className="cards">
                {members.map((member) => (
                    <MemberCard 
                        key={member.id} 
                        member={member} 
                        deleteMember={deleteMember} 
                    />
                ))}
            </ul>
        </div>
    );
};

export default MemberList;