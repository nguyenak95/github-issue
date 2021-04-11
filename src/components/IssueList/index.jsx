import React from "react"
import { ListGroup } from "reactstrap"
import IssueItem from "../IssueItem"

const IssueList = (props) => {
  return (
    <ListGroup className="container-fluid pt-1" onClick={props.onClick}>
      {props.issueList.map((issue) => (
        <IssueItem
          id={issue.id}
          key={issue.id}
          title={issue.title}
          state={issue.state}
        />
      ))}
    </ListGroup>
  )
}

export default IssueList
