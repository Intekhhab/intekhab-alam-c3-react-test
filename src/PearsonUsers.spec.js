import React from "react";
import { shallow } from "enzyme";
import { PearsonUsers } from "./PearsonUsers";

describe("PearsonUsers", () => {
  let component;

  beforeEach(() => {
    component = shallow(<PearsonUsers />);
  });

  it("renders a h1", () => {
    const h1 = component.find("h1");
    expect(h1.text()).toEqual("Pearson User Management");
  });

  describe("render users", () => {
  	it('should renders users', ()=> {
      const users = component.find("#userList");
  		expect(users.children().length).toBe(3);

      /*component.instance().deleteUser(0);
      component = shallow(<PearsonUsers />);
      component.update();
      console.log(component.state().users);
      expect(users.children().length).toBe(2);*/
  	})

  })

  describe("remove duplicate", () => {
    // I have considered combination of first_name and last_name is unique for each user
  	it('should remove duplicate users', ()=> {
  		component.state().users = [];
      var max = 10;
      for (let i = 1; i < max; i++) {
        if (i%2) {
          component.state().users.push({
            id: 4,
            first_name: "Eve",
            last_name: "Holt",
            avatar:
              "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"
          });
        } else
          component.state().users.push({
            id: 4,
            first_name: "intekhab",
            last_name: "Alam",
            avatar:
              "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"
          });
      }
		  //console.log(component.state().users);
	    expect(component.state().users.length).toBe(max-1);
      component.instance().removeDuplicateUsers();
      component.update();
		  //console.log(component.state().users);      
      expect(component.state().users.length == 2).toBe(true);
      expect(component.state().users[0].first_name).toBe('Eve');
      expect(component.state().users[0].last_name).toBe('Holt');
      expect(component.state().users[1].first_name).toBe('intekhab');
  	})

  })

  describe("delete user", () => {
  	it('should delete user', ()=> {
  		component.state().users = [{
          id: 4,
          first_name: "Eve",
          last_name: "Holt",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"
        },{
          id: 4,
          first_name: "intekhab",
          last_name: "alam",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"
        }];
		    //console.log(component.state().users);
        component.instance().deleteUser(0);
        component.update();
        //console.log(component.state().users);
        expect(component.state().users.length).toBe(1);
        expect(component.state().users[0].first_name).toBe("intekhab");
  	})
  	
  })
});
