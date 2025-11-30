import EmployeeData from "./EmployeeData";

export const processedData = EmployeeData.map(emp => {
  const years = 2025 - Number(emp.hireDate.slice(0, 4));

  return {
    ...emp,
    efficiencyScore: (emp.performanceRating / years).toFixed(2),
    promotionScore: (emp.projectsCompleted * 0.4 + emp.performanceRating * 0.6).toFixed(2),
    costEfficiency: (emp.performanceRating / (emp.salary / 1000)).toFixed(3),
    tier:
      emp.performanceRating >= 4.5 ? "Elite" :
      emp.performanceRating >= 4.0 ? "Strong" :
      emp.performanceRating >= 3.5 ? "Average" : "Low"
  };
});
