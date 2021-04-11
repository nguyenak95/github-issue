import axios from "axios"
import { useEffect, useRef, useState } from "react"
import "./App.scss"
import { IssueList, IssueModal, RepoForm, FilterDropDown } from "./components"

const fetchIssue = (repoName, repoOwner, filter) => {
  return axios.get(
    `https://api.github.com/repos/${repoOwner}/${repoName}/issues?state=${filter.toLowerCase()}`,
  )
}
function App() {
  const [issueList, setIssueList] = useState([])
  let newestList = useRef([])
  const [selectedIssueId, setSelectedIssueId] = useState("")
  const [isOnline, setIsOnline] = useState(true)
  const [filter, setFilter] = useState("All")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [repoUrl, setRepoUrl] = useState("")
  const [error, setError] = useState("")
  const handleSetRepo = (url) => {
    setRepoUrl(url)
  }

  const handleClickIssue = (e) => {
    const id = e.target.dataset.id
    if (!id) return
    setSelectedIssueId(id)
    setTimeout(() => setIsModalOpen((s) => !s), 0)
  }
  useEffect(() => {
    window.addEventListener("online", () => {
      setIsOnline(true)
    })
    window.addEventListener("offline", () => {
      setIsOnline(false)
    })
  }, [])
  useEffect(() => {
    if (repoUrl !== "") {
      const splitted = repoUrl.split("/").filter((i) => i)
      const repoOwner = splitted[splitted.length - 2]
      const repoName = splitted[splitted.length - 1]
      fetchIssue(repoName, repoOwner, filter)
        .then((result) => {
          setIssueList(result.data)
          newestList.current = result.data
        })
        .catch(() => {
          if (isOnline) {
            setError("Input wrong repo url")
            setIssueList([])
          } else {
            setError("Offline Mode")
            setIssueList(
              newestList.current.filter(
                (issue) =>
                  filter === "All" || issue.state === filter.toLowerCase(),
              ),
            )
          }
        })
    }
  }, [repoUrl, filter])
  return (
    <main className="container">
      <header>
        <h1>Show your repo issues</h1>
      </header>
      <RepoForm
        handleSetRepo={handleSetRepo}
        setError={setError}
        error={error}
      />
      <FilterDropDown filterName={filter} setFilter={setFilter} />
      <IssueList onClick={handleClickIssue} issueList={issueList} />
      {isModalOpen && (
        <IssueModal
          isOpen={isModalOpen}
          toggle={() => setIsModalOpen((s) => !s)}
          issue={issueList.find(
            (issue) => String(issue.id) === selectedIssueId,
          )}
        />
      )}
    </main>
  )
}

export default App
