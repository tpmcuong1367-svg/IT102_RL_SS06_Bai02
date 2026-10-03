let currentMemberCode = "";
let isRegistered = false;
let totalRevenue = 0;
let checkInCount = 0;

let menu = true;

while (menu) {
  console.log("=== HE THONG QUAN LY HOI VIEN GYM ===");
  console.log("1. Dang ky va chuan hoa ho so");
  console.log("2. Tinh tien goi tap");
  console.log("3. Quet the check-in");
  console.log("4. Bao cao thong ke va thoat");

  let choice = prompt("Nhap lua chon cua ban (1 - 4):");

  if (choice === null || choice.trim() === "") {
    console.log("Loi: Vui long nhap lua chon tu 1 den 4!");
    continue;
  }

  switch (choice.trim()) {
    case "1": {
      currentMemberCode = "";
      isRegistered = false;

      let rawCode = prompt("Nhap ma the hoi vien (VD: GYM-VIP-2026):");
      let rawName = prompt("Nhap ho ten hoi vien:");

      if (rawCode === null || rawName === null || rawCode.trim() === "" || rawName.trim() === "") {
        console.log("Loi: Thong tin khong duoc de trong");
        break;
      }

      let code = rawCode.trim().toUpperCase();
      let name = rawName.trim().toUpperCase();

      if (code.length < 8) {
        console.log("Loi: Ma the phai co do dai tu 8 ky tu tro len");
      } else if (!code.startsWith("GYM-")) {
        console.log("Loi: Ma the phai bat dau bang GYM-");
      } else {
        currentMemberCode = code;
        isRegistered = true;
        console.log("Dang ky thanh cong!");
        console.log("Ma the: " + currentMemberCode);
        console.log("Ho ten: " + name);
      }
      break;
    }

    case "2": {
      if (!isRegistered) {
        console.log("Loi: Vui long dang ky ho so o muc 1 truoc!");
        break;
      }

      let packageTypeInput = prompt("Chon goi tap (STANDARD hoac VIP):");
      let monthsInput = prompt("Nhap so thang dang ky (so nguyen > 0):");
      let ptSessionsInput = prompt("Nhap so buoi thue PT (neu khong nhap 0):");

      if (packageTypeInput === null || monthsInput === null || ptSessionsInput === null) {
        console.log("Da huy tinh tien goi tap");
        break;
      }

      let packageType = packageTypeInput.trim().toUpperCase();
      let months = Number(monthsInput.trim());
      let ptSessions = Number(ptSessionsInput.trim());

      if (isNaN(months) || months <= 0 || isNaN(ptSessions) || ptSessions < 0) {
        console.log("Loi: So thang phai > 0 va so buoi PT phai >= 0");
        break;
      }

      let monthlyFee = 0;
      if (packageType === "STANDARD") {
        monthlyFee = 500000;
      } else if (packageType === "VIP") {
        monthlyFee = 800000;
      } else {
        console.log("Loi: Goi tap chi co STANDARD hoac VIP");
        break;
      }

      let baseCost = (monthlyFee * months) + (ptSessions * 300000);
      let discountRate = 0;

      if (months >= 12) {
        discountRate = 0.25;
      } else if (months >= 6) {
        discountRate = 0.15;
      }

      let discountAmount = baseCost * discountRate;
      let totalPayment = baseCost - discountAmount;

      totalRevenue += totalPayment;

      console.log("BIEN LAI GOI TAP");
      console.log("Ma the: " + currentMemberCode);
      console.log("Goi tap: " + packageType);
      console.log("Thoi han: " + months + " thang");
      console.log("So buoi PT: " + ptSessions);
      console.log("Chi phi goc: " + baseCost.toLocaleString("vi-VN") + " VND");
      console.log("Giam gia (" + (discountRate * 100) + "%): " + discountAmount.toLocaleString("vi-VN") + " VND");
      console.log("Tong thanh toan: " + totalPayment.toLocaleString("vi-VN") + " VND");

      isRegistered = false;
      currentMemberCode = "";
      break;
    }

    case "3": {
      let scanCode = prompt("Quet ma the check-in:");
      if (scanCode === null || scanCode.trim() === "") {
        console.log("Loi: Chua quet ma the");
        break;
      }

      let code = scanCode.trim().toUpperCase();

      if (code.startsWith("GYM-") && code.endsWith("2026")) {
        checkInCount += 1;
        console.log("Check-in thanh cong cho the: " + code);
        console.log("Cua quay da mo!");
      } else {
        console.log("Loi: The khong hop le hoac sai dinh dang!");
      }
      break;
    }

    case "4": {
      console.log("========================================");
      console.log("       BAO CAO TONG KET CA TRUC         ");
      console.log("========================================");
      console.log("Luot check-in cua quay : " + checkInCount);
      console.log("Tong doanh thu ca truc : " + totalRevenue.toLocaleString("vi-VN") + " VND");
      console.log("========================================");
      console.log("Ket thuc ca truc. Tam biet!");
      menu = false;
      break;
    }

    default: {
      console.log("Loi: Lua chon khong hop le, vui long chon 1 den 4!");
      break;
    }
  }
}