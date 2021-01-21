class User {
    constructor(userName, password) {
        this.userName = userName;
        this.password = password;
        this.createdDate = new Date();
        this.allNoteList = [];
        this.allFileList = [];
        this.recentNoteList = [];
        this.repository = [];
    }

    addFolder(newFolder) {
        this.repository.push(newFolder);
    }

    deleteFolder(folder) {
        this.repository = this.repository.filter((f) => {
            return f.title !== folder.title;
        })
    }

    updateAllNotes() {
        let newNoteList = [];
        this.repository.forEach((folder) => {
            folder.fileList.forEach((file) => {
                file.noteList.forEach((note) => {
                    newNoteList.push(note);
                })
            })
        })
        this.allNoteList = newNoteList;
    }

    updateAllFiles() {
        let newFileList = [];
        this.repository.forEach((folder) => {
            folder.fileList.forEach((file) => {
                newFileList.push(file);
            })
        })
        this.allFileList = newFileList;
    }

    updateRecentNotes() {
        const LIMIT = 10;
        let sortedAllNoteList = this.allNoteList;
        sortedAllNoteList.sort(compareModifiedTime);
        this.recentNoteList = [];
        for (let i = 0; i < sortedAllNoteList.length && i < LIMIT; i++) {
            let note = sortedAllNoteList[i];
            this.recentNoteList.push(note);
        }
    }

    findFolder(title) {
        return this.repository.find((folder) => {
            return folder.title === title;
        })
    }

    findFile(title) {
        for (let i = 0; i < this.repository.length; i++) {
            let file = this.repository[i].findFile(title);
            if (file) return file;
        }
        return null;
    }

    findNote(title) {
        for (let i = 0; i < this.repository.length; i++) {
            let note = this.repository[i].findNote(title);
            if (note) return note;
        }
        return null;
    }

    parse(jsonUser) {
        let user = new User(jsonUser.userName, jsonUser.password);
        user.createdDate = new Date(jsonUser.createdDate);
        jsonUser.allNoteList.forEach((note) => {
            user.allNoteList.push(Note.prototype.parse(note));
        })
        jsonUser.recentNoteList.forEach((note) => {
            user.recentNoteList.push(Note.prototype.parse(note));
        })
        jsonUser.repository.forEach((folder) => {
            user.addFolder(Folder.prototype.parse(folder))
        })
        return user;
    }
}

class Folder {
    constructor(title) {
        this.title = title;
        this.createdDate = new Date();
        this.fileList = [];
    }

    addFile(newFile) {
        this.fileList.push(newFile);
    }

    deleteFile(file) {
        this.fileList = this.fileList.filter((f) => {
            return f.title !== file.title;
        })
    }

    findFile(title) {
        return this.fileList.find((file) => {
            return file.title === title;
        })
    }

    findNote(title) {
        for (let i = 0; i < this.fileList.length; i++) {
            let note = this.fileList[i].findNote(title);
            if (note) return note;
        }
        return null;
    }

    parse(jsonFolder) {
        let folder = new Folder(jsonFolder.title);
        folder.createdDate = new Date(folder.createdDate);
        jsonFolder.fileList.forEach((file) => {
            folder.addFile(File.prototype.parse(file));
        })
        return folder;
    }
}

class File {
    constructor(title) {
        this.title = title;
        this.createdDate = new Date();
        this.noteList = [];
    }

    addNote(newNote) {
        this.noteList.push(newNote);
    }

    deleteNote(note) {
        this.noteList = this.noteList.filter((n) => {
            return n.title !== note.title;
        })
    }

    sortNotesByTitle() {
        this.noteList.sort(compareTitle)
    }

    sortNotesByCreatedDate() {
        this.noteList.sort(compareCreatedTime);
    }

    findFolder(user) {
        for (let i = 0; i < user.repository.length; i++) {
            let folder = user.repository[i];
            if (folder.findFile(this.title)) return folder;
        }
        return null;
    }

    findNote(title) {
        return this.noteList.find((note) => {
            return note.title === title;
        })
    }

    filterNoteListBy(input) {
        return this.noteList.filter((note) => {
            let title = note.title.toLowerCase();
            let content = note.content.toLowerCase();
            let date = formatDateHtml(note.modifiedDate);
            return title.includes(input) || content.includes(input) || date.includes(input);
        })
    }

    parse(jsonFile) {
        let file = new File(jsonFile.title);
        file.createdDate = new Date(file.createdDate);
        jsonFile.noteList.forEach((note) => {
            file.addNote(Note.prototype.parse(note));
        })
        return file;
    }
}

class Note {
    constructor(title, attachedLink, content) {
        this.title = title;
        this.attachedLink = attachedLink;
        this.content = content;
        this.createdDate = new Date();
        this.modifiedDate = this.createdDate;
        this.img = autoGenerateImg();
    }

    findFolder(user) {
        for (let i = 0; i < user.repository.length; i++) {
            let folder = user.repository[i];
            if (folder.findNote(this.title)) return folder;
        }
        return null;
    }

    findFile(user) {
        for (let i = 0; i < user.repository.length; i++) {
            let folder = user.repository[i];
            for (let j = 0; j < folder.fileList.length; j++) {
                let file = folder.fileList[j];
                if (file.findNote(this.title)) return file;
            }
        }
        return null;
    }

    parse(jsonNote) {
        let note = new Note(jsonNote.title, jsonNote.attachedLink, jsonNote.content);
        note.createdDate = new Date(jsonNote.createdDate);
        return note;
    }
}
