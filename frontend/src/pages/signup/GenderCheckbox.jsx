

const GenderCheckbox = ({onCheckboxChange,selectedGender}) => {
  return (
    <div className="flex">
        <div className="form-control">
            <label className={`label gap-2 cursor-pointer ${selectedGender === "male" ? "selected" : ""}`}>
                <span style={{ color: "var(--clr-cerulean)" }}>Male</span>
                <input type="checkbox" className="checkbox border-slate-900"
                checked={selectedGender === "male"}
                onChange={() => onCheckboxChange("male")}
                />
            </label>
        </div>
        <div className="form-control">
            <label className={`label gap-2 cursor-pointer ${selectedGender === "female" ? "selected" : ""}`}>
                <span style={{ color: "var(--clr-bitterseet)" }}>Female</span>
                <input type="checkbox" className="checkbox border-slate-900" 
                checked={selectedGender === "female"}
                onChange={() => onCheckboxChange("female")}
                />
            </label>
        </div>
    </div>
  )
}

export default GenderCheckbox
