export async function addjob(job) {
  try {
    const response = await fetch("/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(job),
    });
    const data = await response.json();

    return {
      success: true,
      data: data,
    };
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
}

export async function updateJob(job) {
  try {
    const response = await fetch(`/api/jobs/${job.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(job),
    });
    const data = await response.json();

    return {
      success: true,
      data: data,
    };
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
}

export async function getJobs(isHome) {
  try {
    const api = isHome 
        ? "/api/jobs?_limit=3"
        : "/api/jobs";

    const response = await fetch(api);
    const data = await response.json();

    return {
      success: true,
      data: data,
    };
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};

export async function getJob(id) {
  try {
    const response = await fetch(`/api/jobs/${id}`);
    const data = await response.json();

    return {
      success: true,
      data: data,
    };
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};

export async function deleteJob(id) {
  try {
    const response = await fetch(`/api/jobs/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();

    return {
      success: true,
      data: data,
    };
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
}