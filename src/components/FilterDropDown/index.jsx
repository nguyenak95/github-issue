import React from "react"
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap"

const FilterDropDown = (props) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const toggle = () => setIsOpen((s) => !s)
  const onClickItem = (e) => {
    const filter = e.target.dataset.filter 
    if (!filter) return
    props.setFilter(filter)
  }
  return (
    <Dropdown
      isOpen={isOpen}
      toggle={toggle}
      className="d-flex justify-content-end"
    >
      <DropdownToggle caret>{props.filterName}</DropdownToggle>
      <DropdownMenu onClick={onClickItem}>
        <DropdownItem data-filter="Open">Open</DropdownItem>
        <DropdownItem data-filter="Closed">Closed</DropdownItem>
        <DropdownItem data-filter="All">All</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default FilterDropDown
