const memberDialog = document.querySelector("#member-dialog");

if (memberDialog instanceof HTMLDialogElement) {
  const dialogImage = memberDialog.querySelector("[data-dialog-image]");
  const dialogName = memberDialog.querySelector("#dialog-name");
  const dialogRole = memberDialog.querySelector("[data-dialog-role]");
  const dialogBio = memberDialog.querySelector("[data-dialog-bio]");
  const closeButton = memberDialog.querySelector(".dialog-close");

  if (!dialogImage || !dialogName || !dialogRole || !dialogBio || !closeButton) {
    throw new Error("團員介紹視窗缺少必要元素。");
  }

  document.querySelectorAll(".member-card").forEach((card) => {
    const trigger = card.querySelector(".member-trigger");
    const image = card.querySelector(".member-art");
    const name = card.querySelector(".member-info h3");
    const role = card.querySelector(".member-role");
    const bio = card.querySelector(".member-bio");

    if (!trigger || !image || !name || !role || !bio) {
      throw new Error("團員卡片缺少必要資料。");
    }

    trigger.addEventListener("click", () => {
      dialogImage.src = image.getAttribute("src") || "";
      dialogImage.alt = image.alt;
      dialogName.textContent = name.textContent;
      dialogRole.textContent = role.textContent;
      dialogBio.textContent = bio.textContent;
      memberDialog.showModal();
    });
  });

  closeButton.addEventListener("click", () => memberDialog.close());

  memberDialog.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      memberDialog.close();
    }
  });

  memberDialog.addEventListener("click", (event) => {
    if (event.target === memberDialog) {
      memberDialog.close();
    }
  });
}
