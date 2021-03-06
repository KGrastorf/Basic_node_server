var OneSki = React.createClass({
  deleteSki: function(){
    var id = this.props.id;
    $.ajax({
      method: "DELETE",
      url: "/data/" + id,
      success: function(response){
        this.props.getSkis();
      }.bind(this),
      error: function(xhr, status, err){
        console.log(status, err.toString());
      }.bind(this)
    });
  },
  render: function(){
    return (
        <div key={this.props.key}>
          <h1>{this.props.name}</h1>
          <img src={this.props.image}/>
          <p>{this.props.description}</p>
          <button onClick={this.deleteSki}>Delete This pair of Skis</button>
        </div>
    );
  }
});

var SkiList = React.createClass({
  render: function(){
    var self = this;
    var skiNodes = this.props.skiData.map(function(ski){
      return(
        <OneSki
          id={ski._id}
          name={ski.name}
          description={ski.description}
          image={ski.image}
          getSkis={self.props.getSkis}
        />
      );
    })
    return (
      <div>
        {skiNodes}
      </div>
    );
  }
});

var SkiPage = React.createClass({
  getSkis: function(){
    $.ajax({
      method: "GET",
      url: "/data",
      success: function(response){
        this.setState({listOfSkis: response});
        console.log(response);
      }.bind(this),
      error: function(xhr, status, err){
        console.log(status, err.toString());
      }.bind(this)
    });
  },
  postSki: function(){
    var newSki = {
      name: this.state.name,
      description: this.state.description,
      image: this.state.image,

    }
    $.ajax({
      method: "POST",
      url: "/data",
      data: newSki,
      success: function(response){
        this.getSkis();
        console.log(response);
      }.bind(this),
      error: function(xhr, status, err){
        console.log(status, err.toString());
      }.bind(this)
    });
  },
  updateNewSkiName: function(e){
    this.setState({
        name: e.target.value
    });
    console.log(this.state.newSki);
  },
  updateNewSkiDescription: function(e){
    this.setState({
        description: e.target.value
    });
    console.log(this.state.newSki);
  },
  updateNewSkiImage: function(e){
    this.setState({
        image: e.target.value
    });
    console.log(this.state.newSki);
  },
  componentDidMount: function(){
    this.getSkis();
  },
  getInitialState: function(){
    return {
      listOfSkis: [],

        name:"",
        description: "",
        image: ""

    };
  },
  render: function(){
    return (
      <div>
        <form onSubmit={this.postSki}>
          <input onChange={this.updateNewSkiName} type="text" placeholder="Name of Skis"/>
          <input onChange={this.updateNewSkiDescription} type="text" placeholder="Ski Description"/>
          <input onChange={this.updateNewSkiImage} type="text" placeholder="Image URL"/>
          <button type="submit">Post Skis</button>
        </form>
        <SkiList skiData={this.state.listOfSkis} getSkis={this.getSkis}/>
      </div>
    );
  }
});

ReactDOM.render(
  <SkiPage />,
  document.getElementById('content')
);
