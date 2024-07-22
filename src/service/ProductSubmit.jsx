export const submitProduct = (selectedGender, selectedKind, formData) => {
  let gender_select = selectedGender;
  let kind_select = selectedKind;
  let name = formData.name;
  let color = formData.color;
  let full_name = formData.full_name;
  let code = formData.code;
  let stock = formData.stock;
  let file = formData.file;

  console.log("gender_select:", gender_select);
  console.log("kind_select:", kind_select);
  console.log("FormData:", formData);
};
