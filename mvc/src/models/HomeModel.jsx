export async function fetchHomeData() {
	const token = localStorage.getItem("token");
	const response = await fetch("http://localhost:5000/api/home", {
	  headers: {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json",
	  },
	});
  
	if (!response.ok) {
	  throw new Error("Failed to fetch home data");
	}
  
	const data = await response.json();
	return data;
  }
  