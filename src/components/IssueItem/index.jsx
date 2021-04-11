import React from "react"
import { ListGroupItem } from "reactstrap"
import './index.scss'
const IssueItem = (props) => {
  return (
    <li className={`issue__item ${props.state}`} data-id={props.id}>
      {props.title}
    </li>
  )
}

export default React.memo(IssueItem)
