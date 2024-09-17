import React from "react";
import MemberForm from "./MemberForm";
import MemberList from "./MemberList";
import Search from "./Search";




const MemberPage = ({ members, setTerm, term, addMember, deleteMember }) => {
    return (
        <div>
            <MemberForm addMember={addMember} />
            <Search setTerm={setTerm} term={term} />
            <MemberList members={members} deletemember={deleteMember} />
        </div>
    );
}

export default MemberPage