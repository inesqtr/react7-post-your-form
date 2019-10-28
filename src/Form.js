import React, { Component } from 'react';



class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: '',
            url: '',
            comment: '',
        };
        this.onChange = this.onChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    submitForm(e) {
        e.preventDefault();

        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: this.state.movie,
                poster: this.state.url,
                comment: this.state.comment
            }),
        };

        const url = "https://post-a-form.herokuapp.com/api/movies";

        fetch(url, config)
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    alert(res.error);
                } else {
                    alert(`Saved ${res.title} movie!`);
                }
            })
            .catch(e => {
                console.error(e);
                alert('Error, movie not saved');
            });
    }

    render() {
        return (
            <div className="Form">
                <h1> Your Favourite Movie</h1>

                <form onSubmit={this.submitForm}>
                    <fieldset>
                        <legend>Information</legend>
                        <div className="form-data">
                            <label htmlFor="movie">Movie Name</label>
                            <input
                                type="text"
                                id="movie"
                                name="movie"
                                value={this.state.movie}
                                onChange={this.onChange}
                                required
                            />
                        </div>

                        <div className="form-data">
                            <label htmlFor="url">Movie url</label>
                            <input
                                type="text"
                                id="url"
                                name="url"
                                value={this.state.url}
                                onChange={this.onChange}
                                required
                            />
                        </div>

                        <div className="form-data">
                            <label htmlFor="comment">Enter a comment about your choice (why do you like this film? what drew you to this film?)</label>
                            <input
                                type="text"
                                id="comment"
                                name="comment"
                                value={this.state.comment}
                                onChange={this.onChange}
                                required
                            />
                        </div>
                        <hr />
                        <div className="form-data">
                            <input type="submit" value="Send" />
                        </div>
                    </fieldset>
                </form>
            </div>
        );

    }
}

export default Form;

