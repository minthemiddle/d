function app() {
    const entries = JSON.parse(localStorage.getItem('entries')) || [];

    return {
        entries,
        date: new Date().toISOString().slice(0, 10),
        description: '',
        saveEntries() {
            const Entries = {
                date: this.date,
                description: this.description,
            };
            this.entries.push(Entries);
            localStorage.setItem('entries', JSON.stringify(this.entries));
            this.resetForm();
        },
        resetForm() {
            this.date = '';
            this.description = '';
        },
        copyEntries() {
            const text = this.entries.map(({date, description}) => {
                return `# ${date}\n\n${description}`;
            }).join('\n\n');
            if (navigator.clipboard) {
                navigator.clipboard.writeText(text);
            } else {
                console.error(text);
            }
        },
        deleteAllEntries() {
            this.entries = [];
            localStorage.setItem('entries', JSON.stringify([]));
        },
        editEntries(index) {
            const {date, description} = this.entries[index];
            this.date = date;
            this.description = description;
            this.deleteEntries(index);
        },
        deleteEntries(index) {
            this.entries.splice(index, 1);
            localStorage.setItem('entries', JSON.stringify(this.entries));
        }
    };
}