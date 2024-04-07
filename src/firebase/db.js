import { getDatabase } from "firebase/database";
import { app } from "../conf/conf";
import { authService } from "./auth";

import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  addDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";

class dbServcie {
  firestore = getFirestore(app);
  db = getDatabase(app);

  async addUserToDatabase(userId, email) {
    try {
      await addDoc(collection(database.firestore, "user"), {
        userId,
        email,
      });
    } catch (error) {
      console.log("add user to database error", error);
    }
  }
  async addUserData(data) {
    try {
      await addDoc(collection(database.firestore, "todos"), { userData: data });
    } catch (error) {
      console.log("adding userData error", error);
    }
  }
  getData(callback) {
    const todosRef = collection(this.firestore, "todos");

    return onSnapshot(todosRef, callback);
  }
  async createTeam(userId, data) {
    try {
      const userData = await authService.getCurrentUser();

      const docRef = doc(database.firestore, "todos", userId); // Assuming userId is the document ID
      const docData = await getDoc(docRef);
      if (docData.exists()) {
        const existingData = docData.data();
        let existingTeam = existingData.team || [];
        const newTeam = {
          id: `${Date.now()}`,
          teamName: data.teamName,
          teamMembers: [],
          teamData: [],
        };
        if (userData) {
          newTeam.teamMembers = [
            ...newTeam.teamMembers,
            { id: userData.uid, email: userData.email, owner: true },
          ];
          const updatedTeam = [...existingTeam, newTeam];
          await updateDoc(docRef, { team: updatedTeam });
        }
      }
    } catch (error) {
      console.log("create team error", error);
      throw error; // Optionally rethrow the error for handling in the component
    }
  }

  async createTeamData(id, teamId, data) {
    try {
      const docRef = doc(database.firestore, "todos", id);
      const docData = await getDoc(docRef);
      if (docData.exists()) {
        const existingData = docData.data();
        const team = existingData.team.find((team) => team.id === teamId);

        if (team) {
          team.teamData = [{ id: Date.now(), ...data }, ...team.teamData];
          await updateDoc(docRef, { team: existingData.team });
        }
      }
    } catch (error) {
      console.log("add Project error", error);
    }
  }
  async addTeamMembers(id, teamId, data) {
    const docRef = doc(database.firestore, "todos", id);
    const docData = await getDoc(docRef);
    if (docData.exists()) {
      const existingData = docData.data();
      const team = existingData.team.find((team) => team.id === teamId);
      if (team) {
        team.teamMembers = [...team.teamMembers, { ...data, owner: true }];
        await updateDoc(docRef, { team: existingData.team });
      }
    }
  }
  async updateDocument(id, data) {
    try {
      const docRef = doc(database.firestore, "todos", id);
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        const existingData = docSnapshot.data();
        const updatedSubTodo = [
          ...existingData.subTodo,
          { id: `${Date.now()}-${data.id}`, todo: data.todo, status: "new" },
        ];

        await updateDoc(docRef, { subTodo: updatedSubTodo });
      } else {
        console.log("Document does not exist");
      }
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  }

  async updateData(id, data) {
    try {
      const docRef = doc(database.firestore, "todos", id);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        const existingData = docSnapshot.data();
        const updateTodo = existingData.subTodo.find(
          (item) => item.id === data.id
        );
        if (updateTodo) {
          Object.assign(updateTodo, data);
          await updateDoc(docRef, existingData);
        }
      }
    } catch (error) {
      console.log("error updating status ", error);
    }
  }
}
const database = new dbServcie();
export default database;
