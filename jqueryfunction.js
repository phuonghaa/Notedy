var isTreeViewDisplayed = false;
var isNoteListSorted = false;

$('#folder-tree-list-btn').click(toggleTreeView);

$("#search-btn").click(function () {
    $("#search-input").toggleClass("active");
})

$('#newFolderWindow').on('hidden.bs.modal', function () {
    $('#new-folder-name').val('').removeClass("border-danger");
    $('.new-folder-alert-error').hide();
    $('.new-folder-alert-success').hide();
})

$('#newFileWindow').on('hidden.bs.modal', function () {
    $('#new-file-name').val('').removeClass("border-danger");
    $('#new-file-name').hide();
    $('#add-file-btn').hide();
    $('.new-file-alert-error').hide();
    $('.new-file-alert-success').hide();
})

$('.web-name').click(function () {
    displayRepository(currentUser);
})

$('.folder-detail').click(function () {
    $(".folder-detail #context-menu").removeClass("show").hide();
});

$(".repo-detail #context-menu a").on("click", function () {
    $(this).parent().removeClass("show").hide();
});

$(".folder-detail #context-menu a").on("click", function () {
    $(this).parent().removeClass("show").hide();
});

$('.repo-detail').click(() => {
    $(".repo-detail #folder-context-menu").removeClass("show").hide();
})

$('#new-folder-name').keyup(function (e) {
    let newFolderTitle = $('#new-folder-name').val().trim();
    let findFolder = currentUser.findFolder(newFolderTitle);
    if (findFolder) {
        $('#new-folder-name').addClass("border-danger");
        $('.new-folder-alert-error').text(`A folder "${newFolderTitle}" already exists in your repository!`);
        $('.new-folder-alert-error').show();
    }
    else if (newFolderTitle.length === 0) {
        $('#new-folder-name').addClass("border-danger");
        $('.new-folder-alert-error').text(`A folder name must be provided!`);
        $('.new-folder-alert-error').show();
    }
    else if (!isValidTitle(newFolderTitle)) {
        $('#new-folder-name').addClass("border-danger");
        $('.new-folder-alert-error').text(`Folder name must contain only characters, numeric digits and underscore!`);
        $('.new-folder-alert-error').show();
    }
    else {
        $('#new-folder-name').removeClass("border-danger");
        $('.new-folder-alert-error').hide();
        if (e.key === "Enter") $("#add-folder-btn").click();
    }
})

$('#new-file-name').keyup(function (e) {
    let newFileTitle = $('#new-file-name').val().trim();
    let findFile = currentUser.findFile(newFileTitle);
    if (findFile) {
        $('#new-file-name').addClass("border-danger");
        $('.new-file-alert-error').text(`A file "${newFileTitle}" already exists in your repository!`);
        $('.new-file-alert-error').show();
    }
    else if (newFileTitle.length === 0) {
        $('#new-file-name').addClass("border-danger");
        $('.new-file-alert-error').text(`A file name must be provided!`);
        $('.new-file-alert-error').show();
    }
    else if (!isValidTitle(newFileTitle)) {
        $('#new-file-name').addClass("border-danger");
        $('.new-file-alert-error').text(`File name must contain only characters, numeric digits and underscore!`);
        $('.new-file-alert-error').show();
    }
    else {
        $('#new-file-name').removeClass("border-danger");
        $('.new-file-alert-error').hide();
        if (e.key === "Enter") $("#add-file-btn").click();
    }
})

function toggleTreeView() {
    if (!isTreeViewDisplayed) openTreeView();
    else hideTreeView();
}

function openTreeView() {
    $('.repo-zone').show();
    $('.relative-link').css('width', '85vw');
    $('.detail-zone').css({
        "width": "85vw",
        "float": "right"
    })
    isTreeViewDisplayed = true;
}

function hideTreeView() {
    $('.repo-zone').hide();
    $('.relative-link').css('width', '100vw');
    $('.detail-zone').css({
        "width": "100vw",
        "float": "none"
    })
    isTreeViewDisplayed = false;
}

function toggleSortNote() {
    if (!isNoteListSorted) sortFile();
    else unsortFile();
}

function sortFile() {
    let folderTitle = getTitleFromLink($('.relative-link .folder-link').text());
    let fileTitle = getTitleFromLink($('.relative-link .file-link').text());
    let folder = currentUser.findFolder(folderTitle);
    let file = currentUser.findFile(fileTitle);
    file.sortNotesByTitle();
    displayFile(folder, file);
    isNoteListSorted = true;
}

function unsortFile() {
    let folderTitle = getTitleFromLink($('.relative-link .folder-link').text());
    let fileTitle = getTitleFromLink($('.relative-link .file-link').text());
    let folder = currentUser.findFolder(folderTitle);
    let file = currentUser.findFile(fileTitle);
    file.sortNotesByCreatedDate();
    displayFile(folder, file);
    isNoteListSorted = false;
}

function fillFolderOption() {
    let stringHtml = `<option value="">Choose Folder...</option>`;
    currentUser.repository.forEach((folder) => {
        stringHtml += `<option value="${folder.title}">${folder.title}</option>`
    })
    $('#folder-select').html(stringHtml);
    if ($('.relative-link .folder-link').length > 0) {
        let folderLink = getTitleFromLink($('.relative-link .folder-link').text());
        $('#folder-select').val(folderLink);
        $('#new-file-name').show();
        $('#add-file-btn').show();
        setTimeout(function () {
            $('#new-file-name').focus();
        }, 500);
    }
    $('#folder-select').change(function () {
        if ($('#folder-select').val() !== "") {
            $('#new-file-name').show();
            $('#add-file-btn').show();
            setTimeout(function () {
                $('#new-file-name').focus();
            }, 500);
        }
        else {
            $('#new-file-name').hide();
            $('#add-file-btn').hide();
        }
    })
}

function enterNoteTitle() {
    let newNoteTitle = $("#new-note-title").val().trim();
    let findNote = currentUser.findNote(newNoteTitle);
    if (findNote) {
        $(this).addClass("border-danger");
        $('.new-note-alert-error').text(`A note "${newNoteTitle}" already exists in your repository!`);
        $('.new-note-alert-error').show();
    }
    else if (newNoteTitle.length === 0) {
        $(this).addClass("border-danger");
        $('.new-note-alert-error').text(`A note name must be provided!`);
        $('.new-note-alert-error').show();
    }
    else if (!isValidTitle(newNoteTitle)) {
        $(this).addClass("border-danger");
        $('.new-note-alert-error').text(`Note name must contain only characters, numeric digits and underscore!`);
        $('.new-note-alert-error').show();
    }
    else {
        $(this).removeClass("border-danger");
        $('.new-note-alert-error').hide();
    }
}

$('.repo-zone').contextmenu(function (e) {
    let top = e.pageY - 40;
    let left = e.pageX;
    $(".repo-zone #treeview-context-menu").css({ display: "block", top: top, left: left }).addClass("show");
    return false;
}).click(function () {
    $(".repo-zone #treeview-context-menu").removeClass("show").hide();
});

$(".repo-zone #treeview-context-menu a").on("click", function () {
    fillFolderOption();
    $(this).parent().removeClass("show").hide();
});

$('#new-file-btn').click(function () {
    openTreeView();
    fillFolderOption();
    let allFileToggler = document.getElementsByClassName('fa-angle-right')[0];
    if (!allFileToggler.parentElement.parentElement.querySelector('.hidden').classList.contains("active")) {
        allFileToggler.parentElement.parentElement.querySelector('.hidden').classList.toggle("active");
        allFileToggler.classList.toggle("fa-angle-down");
    }
})

$('#new-folder-btn').click(function () {
    openTreeView();
    setTimeout(function () {
        $('#new-folder-name').focus();
    }, 500);
})

$(document).ready(function () {
    var ctrlDown = false,
        ctrlKey = 17,
        cmdKey = 91,
        spaceKey = 32;

    $(document).keydown(function (e) {
        if (e.keyCode == ctrlKey || e.keyCode == cmdKey) ctrlDown = true;
    }).keyup(function (e) {
        if (e.keyCode == ctrlKey || e.keyCode == cmdKey) ctrlDown = false;
    });

    $(document).keydown(function (e) {
        if (ctrlDown && (e.keyCode == spaceKey)) return false;
    });

    $(document).keydown(function (e) {
        if (ctrlDown && (e.keyCode == spaceKey)) {
            if ($('.folder-link').length === 0 && $('.file-link').length === 0) {
                $('#new-folder-btn').click();
            }
            if ($('.folder-link').length > 0 && $('.file-link').length === 0) {
                $('#new-file-btn').click();
            }
            if ($('.file-link').length > 0) {
                $('#add-note-btn').click();
            }
        }
    });
})