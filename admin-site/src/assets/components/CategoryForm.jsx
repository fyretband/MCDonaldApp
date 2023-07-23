import {useNavigate} from "react-router-dom"
import { useDispatch,useSelector } from "react-redux"
import "./AddForm"
import { addCategory } from "../../store/action/ActionCreator"
const CategoryForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
   

    const handleSubmit = async(event)=> {
        event.preventDefault()

        try {
            await dispatch(
                addCategory({
                    name: event.target.name.value
                })
            )
            navigate("/category", {replace: true})
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
    <form
      style={{ marginLeft: 400, marginTop: 70 }}
      className="add-form"
      onSubmit={handleSubmit}
    >
      <h1 style={{ textAlign: "center" }}>Add Category</h1>
      <div className="form-group">
        <label className="form-label">
          Name:
          <input className="form-input" type="text" name="name" />
        </label>
      </div>
      <button className="submit-btn" type="submit">
        Add Category
      </button>
    </form>
  </>
      );
}
export default CategoryForm