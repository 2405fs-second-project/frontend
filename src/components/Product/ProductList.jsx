import React from "react";
import "./ProductList.css";
export const ProductList = () => {
  const products = [
    {
      id: 1,
      name: "Product A",
      category_gender: "남자",
      category_kind: "티셔츠",
      color: "Red",
      fullname: "Product A Fullname",
      code: "A001",
      stock: 10,
      price: 10000,
      description: "This is product A",
      image: "base64imagestring", // 예시로 Base64 이미지 문자열 사용
    },
    {
      id: 2,
      name: "Product B",
      category_gender: "여자",
      category_kind: "자켓",
      color: "Blue",
      fullname: "Product B Fullname",
      code: "B002",
      stock: 5,
      price: 15000,
      description: "This is product B",
      image: "base64imagestring", // 예시로 Base64 이미지 문자열 사용
    },
    // 추가적인 제품 데이터도 필요한 만큼 추가할 수 있음
  ];

  // fetch서버로 받은 데이터로 표시하기
  //   useEffect(() => {
  //     fetchProducts();
  //   }, []);

  //   const fetchProducts = async () => {
  //     try {
  //       const response = await fetch("/api/products"); // Spring Boot API 엔드포인트
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch products");
  //       }
  //       const data = await response.json(); // JSON 형식으로 변환
  //       setProducts(data); // 받은 데이터를 상태에 저장
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //       // 에러 처리 로직 추가
  //     }
  //   };

  return (
    <div>
      <table className="list_container">
        <thead>
          <tr>
            <th>대분류</th>
            <th>중분류</th>
            <th>상품명</th>
            <th>색상</th>
            <th>상품명(KR)</th>
            <th>상품코드</th>
            <th>수량</th>
            <th>금액</th>
            <th>상품 이미지</th>
          </tr>
        </thead>
        <tbody className="list-body">
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.category_gender}</td>
              <td>{product.category_kind}</td>
              <td>{product.name}</td>
              <td>{product.color}</td>
              <td>{product.fullname}</td>
              <td>{product.code}</td>
              <td>{product.stock}</td>
              <td>{product.price}</td>
              <td>
                {product.image && (
                  <img
                    src={`data:image/jpeg;base64,${product.image}`}
                    alt={product.name}
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
