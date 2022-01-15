import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchProjects = createAsyncThunk(
    'project/fetchProjects',
    async () => {
      const response = await fetch('https://still-peak-02811.herokuapp.com/projects')
      .then(res => res.json())
      return response
    }
)

export const postReacts = createAsyncThunk(
    'project/postReacts',
    async (project) => {
        let url = `https://still-peak-02811.herokuapp.com/reaction/${project._id}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount > 0){
                return project
            }else{
                console.log('No response!');
            }
        })
        .catch((error) => {
            console.log(error);
        })
        return response
    }
)

export const postViews = createAsyncThunk(
    'project/postViews',
    async (project) => {
        let url = `https://still-peak-02811.herokuapp.com/views/${project._id}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount > 0){
                return project
            }else{
                console.log('No response!');
            }
        })
        .catch((error) => {
            console.log(error);
        })
        return response
    }
)

export const fetchReviews = createAsyncThunk(
    'project/fetchReviews',
    async () => {
      const response = await fetch('https://still-peak-02811.herokuapp.com/reviews')
      .then(res => res.json())
      return response
    }
)

export const addReview = createAsyncThunk(
    'project/addReview',
    async (review) => {
        let url = 'https://still-peak-02811.herokuapp.com/add-review';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(review)
        })
        .then(res => res.json())
        .then(data => {
            if(data.insertedId){
                return review
            }else{
                console.log('No response!');
            }
        })
        .catch((error) => {
            console.log(error);
        })
        return response
    }
)

const projectSlice = createSlice({
    name: 'project',
    initialState: {
        projectsList: [],
        reviewsList: [],
        status: 'idle',
    },
    reducers: {
        addTo: (state, action) => {
            state.wishList.push(action.payload); 
        },
        removeFrom: (state, action) => {
            state.wishList = state.wishList.filter(project => project.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchProjects.fulfilled, (state, action) => {
          state.projectsList = action.payload;
          state.status = 'success';
        })

        builder.addCase(postReacts.fulfilled, (state, action) => {
            state.projectsList = state.projectsList.map(project => project._id === action.payload._id ? {...project, loves: project.loves + 1 } : project);
            state.status = 'success';
        })

        builder.addCase(postViews.fulfilled, (state, action) => {
            state.projectsList = state.projectsList.map(project => project._id === action.payload._id ? {...project, views: project.views + 1 } : project);
            state.status = 'success';
        })

        builder.addCase(fetchReviews.fulfilled, (state, action) => {
            state.reviewsList = action.payload;
            state.status = 'success';
        })

        builder.addCase(addReview.fulfilled, (state, action) => {
            state.reviewsList = [...state.reviewsList, action.payload];
            state.status = 'success';
        })
    },
});

// Action creators are generated for each case reducer function
export const { addTo, removeFrom } = projectSlice.actions;
export default projectSlice.reducer;