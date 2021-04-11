import React, { useState } from "react"
import { Form, Input, FormGroup, Label, Button, FormText } from "reactstrap"

const RepoForm = (props) => {
  const [inputUrl, setInputUrl] = useState("")
  const handleSubmit = () => {
    if (inputUrl === "" || inputUrl === props.repoUrl) {
      return
    }
    props.handleSetRepo(inputUrl)
  }
  const handleChangeInput = ({ target }) => {
    if (props.error) {
      props.setError("")
    }
    setInputUrl(target.value)
  }
  return (
    <Form>
      <FormGroup>
        <Label>Repo's link</Label>
        <Input
          value={inputUrl}
          placeholder="Link to your github repo"
          onChange={handleChangeInput}
        />
      </FormGroup>
      <FormText color="danger">
        <span>{props.error || ""}</span>
      </FormText>
      <FormGroup>
        <Button color="primary" onClick={handleSubmit}>
          Show Issues
        </Button>
      </FormGroup>
    </Form>
  )
}

export default RepoForm
