

var jsPsych = initJsPsych({
  extensions: [
    {type: jsPsychExtensionWebgazer}
  ],
  on_finish: function() {
      jsPsych.data.displayData();
  }
});

var preload = {
  type: jsPsychPreload,
  images: ['img/blue.png']
};



var camera_instructions = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <p>This experiment uses your camera for eye tracking.</p>
    <p>In order to participate you must allow the experiment to use your camera.</p>
    <p>You will be prompted to do this on the next screen.</p>
  `,
  choices: ['Click to begin'],
  post_trial_gap: 1000,
  images: ['img/blue.png']
};

var init_camera = {
  type: jsPsychWebgazerInitCamera
};


var camera_instructions = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
      <p>In order to participate you must allow the experiment to use your camera.</p>
      <p>You will be prompted to do this on the next screen.</p>
      <p>If you do not wish to allow use of your camera, you cannot participate in this experiment.<p>
      <p>It may take up to 30 seconds for the camera to initialize after you give permission.</p>
    `,
  choices: ['Got it'],
}


var calibration_instructions = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
      <p>Now you'll calibrate the eye tracking, so that the software can use the image of your eyes to predict where you are looking.</p>
      <p>You'll see a series of dots appear on the screen. Look at each dot and click on it.</p>
    `,
  choices: ['Got it'],
}

var calibration = {
  type: jsPsychWebgazerCalibrate,
  calibration_points: [
    [25, 25], [75, 25], [50, 50], [25, 75], [75, 75]
  ],
  repetitions_per_point: 2,
  randomize_calibration_order: true
}

var validation_instructions = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
      <p>Now we'll measure the accuracy of the calibration.</p>
      <p>Look at each dot as it appears on the screen.</p>
      <p style="font-weight: bold;">You do not need to click on the dots this time.</p>
    `,
  choices: ['Got it'],
  post_trial_gap: 1000
}

var validation = {
  type: jsPsychWebgazerValidate,
  validation_points: [
    [25, 25], [75, 25], [50, 50], [25, 75], [75, 75]
  ],
  roi_radius: 200,
  time_to_saccade: 1000,
  validation_duration: 2000,
  data: {
    task: 'validate'
  }
}

var calibration_done = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
      <p>Great, we're done with calibration!</p>
    `,
  choices: ['OK']
}


var start = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: 'Press any key to start.'
};

var trial = {
  type: jsPsychImageKeyboardResponse,
  stimulus: 'img/blue.png',
  render_on_canvas: false,
  choices: "NO_KEYS",
  trial_duration: 1000,
  extensions: [
    {
      type: jsPsychExtensionWebgazer, 
      params: {targets: ['#jspsych-image-keyboard-response-stimulus']}
    }
  ]
};


var done = {
  type: jsPsychHtmlButtonResponse,
  choices: ['CSV', 'JSON'],
  stimulus: `<p>Done!</p><p>If you'd like to download the data, click the format you'd like below</p>`,
  on_finish: function(data){
    if(data.response == 0){
      jsPsych.data.get().localSave('csv','webgazer-sample-data.csv');
    }
    if(data.response == 1){
      jsPsych.data.get().localSave('json', 'webgazer-sample-data.json');
    }
  }
};


var timeline = [];

timeline.push(preload);
timeline.push(camera_instructions);
timeline.push(init_camera);
timeline.push(calibration_instructions);
timeline.push(calibration);
timeline.push(validation_instructions);
timeline.push(validation);
timeline.push(calibration_done);
timeline.push(start);
timeline.push(trial);
timeline.push(done);

jsPsych.run(timeline);



