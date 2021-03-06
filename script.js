// 保存用のファイル名を生成
function yyyymmddhhmise() {
 // 日付時間秒を文字列で返す	
    const dt = new Date();
    var yyyy = dt.getFullYear();
    var mm = ('00' + (dt.getMonth()+1)).slice(-2);
    var dd = ('00' + dt.getDate()).slice(-2);
    var hh = ('00' + dt.getHours()).slice(-2);
    var mi = ('00' + dt.getMinutes()).slice(-2);
    var se = ('00' + dt.getSeconds()).slice(-2);
  
    var answer = yyyy + mm + dd + "-" + hh + mm + se ;
    return (answer);
  }
var filename = "yanokura-2022-" + yyyymmddhhmise() + ".csv" ;
// 

var jsPsych = initJsPsych({
  on_finish: function() {
//    jsPsych.data.get().localSave('csv', filename); // 保存時(本番用)
//    jsPsych.data.displayData();                    // 画面表示で確認用
  }
});

// ------------------------------------------------------------------------
// 共有パーツ
// ------------------------------------------------------------------------
var exit_fullscreen = {
  type: jsPsychFullscreen,
  fullscreen_mode: false,
  delay_after: 0
}

var preload = {
  type: jsPsychPreload,
  auto_preload: true
}

// 凝視点
var eyepoint = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<p style="font-size: 48px;">+</p>',
  choices: jsPsych.NO_KEYS,
  trial_duration: 1500, // 表示時間
};

// 空白画面
var blankscreen = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '',
  choices: jsPsych.NO_KEYS,
  trial_duration: 2000, // 表示時間 
};

// ------------------------------------------------------------------------
// 教示文
// ------------------------------------------------------------------------

var enter_fullscreen = {
  type: jsPsychFullscreen,
  message: '<p>実験名: 2022-矢ノ倉</p><p>開始ボタンを押すと全画面表示で実験が始まります。</p>',
  button_label: "開始",
  fullscreen_mode: true
}

// 教示文最初ページ
var instruction_p1 = {
  type: jsPsychHtmlButtonResponse,
  stimulus: '<div align="left">\
この度は本実験にご協力くださり、誠にありがとうございます。<br><br>\
<br><br>\
以下をお読みいただき、ご理解いただけましたら<br><br>\
「開始」ボタンを押してください。<br><br>\
<br><br><div style="border: dashed;padding : 30px" ;>\
　■ 本実験への参加・回答は強制ではありません。<br><br>\
　■ 参加の可否や回答の有無により皆様に利益・不利益が生じることはありません。<br><br>\
<br><br>\
　【得られたデータに関して】<br><br>\
 　■ 厳重な管理の下で本研究のみに使用します。<br><br>\
 　■ 統計的な処理を行うため、個人が特定されることはありません。<br><br>\
 　■ 研究の終了後には適切に処分します。<br><br></div>\
<br><br>\
<br></div>\
',
choices: ['開始'],
} ;

// 被検者情報の入力
var instruction_p2 = {
  type: jsPsychSurveyHtmlForm,
  preamble:'<div align="left"><font size=4>\
最初に、以下について回答をお願いします。<br>\
答えたくない質問に関しては回答の必要はありません。<br>\
<br>\
回答の終了後は「次へ」を押してください。<br><br>\
<br></font></div>\
',
html: '\
性別（１：男性、２：女性、３：回答しない）<input name="q1" type="text" /><br><br>\
年齢（半角数字のみ）　　　　　　　　　　　<input name="q2" type="text" /><br><br>\
授業以外での音楽経験　　　<br><textarea name="q3" rows="3" cols="80"></textarea><br><br>\
授業以外でのスポーツ経験　<br><textarea name="q4" rows="3" cols="80"></textarea><br><br>\
<br>',
  button_label: '次へ',
} ;

// これから心拍数を測定します
var instruction_p3 = {
  type: jsPsychHtmlButtonResponse,
  stimulus: '<div align="left">\
続いて、心拍数を測定します。<br>\
<br>\
実験者の指示に従ってください。<br>\
<br></div>\
',
choices: ['次へ'],
} ;

// 心拍数測定中画面
var NumOfHeartbeats_p1 = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<p style="font-size: 48px;">+</p>',
  choices: ['q'],
} ;

// 心拍数の入力
var NumOfHeartbeats_p2 = {
  type: jsPsychSurveyHtmlForm,
  preamble:'',
html: '\
測定した心拍数はいくつだと思いましたか。入力してください。<input name="q1" type="text" /><br><br>\
<br><br>\
　　　　　　　　　　　　　　　　　　　　　　　（実測値）　<input name="q2" type="text" /><br><br>\
<br><br>\
入力が完了しましたら、実験の説明に移ります。「次へ」を押してください。<br>\
<br>',
  button_label: '次へ',
} ;

// 実験の説明(1/3) テンポAの説明
var instruction_p4 = {
  type: jsPsychHtmlKeyboardResponse,
  choices: "ALL_KEYS",
  stimulus: '<div align="center">\
<p style="font-size: 320px;">A</p>\
まず、一定のテンポで音を刻むテンポAが約20秒間再生されます。\
<br>\
その後、画面は自動的に切り替わります。\
<br><br>\
(何かキーを押すと次の画面に進みます。)\
<br></div>\
',
} ;

// 実験の説明(2/3) テンポBの説明
var instruction_p5 = {
  type: jsPsychHtmlButtonResponse,
  choices: ["回答"],
  stimulus: '<div align="center">\
<p style="font-size: 320px;">B</p>\
',
  prompt: '<div align="center"><br>\
続いて、一定のテンポで音を刻むテンポBが再生されます。<br>\
先程のテンポAと比べてどのくらい速い（または遅い）かを判断してください。<br>\
「回答」ボタンを押すと、再生が止まり画面が切り替わります。<br>\
<br></div>\
',
} ;

// 実験の説明(3/3) スライダーの説明
var instruction_p6 = {
  type: jsPsychHtmlSliderResponse,
//  require_movement: true,
  labels: ['遅い', '同じ', '速い'],
  button_label: "次へ",
  stimulus: '<div align="left">\
テンポB（後に聴いたテンポ）が、テンポA（先に聴いたテンポ）に比べて、<br>\
どのくらい速い（または遅い）かを、ツマミを動かして回答してください。<br>\
<br>\
「次へ」ボタンを押すと、画面が切り替わり次の試行が始まります。<br>\
<br>\
',
} ;

// これから練習開始
var instruction_p7 = {
  type: jsPsychHtmlButtonResponse,
  choices: ["開始"],
  stimulus: '<div align="left">\
  以上の流れを1試行とし、<br>\
  11試行からなるブロックに3回（計33試行）回答していただきます。<br>\
  <br>\
  <br>\
  ※<strong>　テンポA　</strong>と<strong>　テンポB　</strong>の音の高さは全て同じです。<br>\
  <br>\
  <br>\
    それでは、練習試行を行います。<br>\
  「開始」ボタンを押してください。<br><br></div>\
',
} ;

// 練習終了
var instruction_p8 = {
  type: jsPsychHtmlButtonResponse,
  choices: ["次へ"],
  stimulus: '<div align="left">\
以上で練習試行は終了です。<br>\
<br>\
<br>\
分からないことがありましたら、実験者に質問してください。<br>\
<br>\
<br>\
また、実験中に気分が悪くなった場合には、すぐに回答を止めてください。<br>\
<br>\
<br>\
',
} ;

// これから実験開始
var instruction_p9 = {
  type: jsPsychHtmlButtonResponse,
  choices: ["実験開始"],
  stimulus: '<div align="left">\
それでは、実験を始めます。<br>\
<br>\
<br>\
準備ができましたら、「実験開始」ボタンを押してください。<br>\
<br>\
',
} ;

// 休憩
var instruction_p10 = {
  type: jsPsychHtmlKeyboardResponse,
  choices: "ALL_KEYS",
//  choices: ['q'],
  stimulus: '<div align="center">\
<p style="font-size: 180px;">休　憩</p>\
<br></div>\
',
} ;

// 実験の終了
var bye = {
  type: jsPsychHtmlButtonResponse,
  stimulus: '<div align="left"><font size=6>\
以上で実験は終了です。<br>\
<br>\
<br>\
実験者が参りますので、PCは操作せずに少々お待ちください。<br>\
<br></font></div>\
',
choices: ['実験を終わる'],
};

// 最初の説明と被検者情報の入力
var par_id = {
  type: jsPsychSurveyText,
  questions: [
    {prompt: '参加者ID（例　A1，B2）を入力してください。', columns: 10, required: true, name: 'id'},
    {prompt: '性別（1：男性，2：女性，3：回答しない）を入力してください。', columns: 10, required: true, name: 'sex'},
    {prompt: '年齢（半角数字のみ）を入力してください', columns: 10, required: true, name: 'age'},
  ],
  button_label: '実験の開始',
};

// ------------------------------------------------------------------------
// 練習までの教示文
// ------------------------------------------------------------------------

var introduction = {
  timeline: [],
};

// 出来上がった問題をtimelineにpush
introduction.timeline.push(instruction_p1) ;
introduction.timeline.push(instruction_p2) ;
introduction.timeline.push(instruction_p3) ;

introduction.timeline.push(NumOfHeartbeats_p1) ;
introduction.timeline.push(NumOfHeartbeats_p2) ;

introduction.timeline.push(instruction_p4) ;
introduction.timeline.push(instruction_p5) ;
introduction.timeline.push(instruction_p6) ;
introduction.timeline.push(instruction_p7) ;


// ------------------------------------------------------------------------
// 問題の作成(共通)
// ------------------------------------------------------------------------
// 刺激
var stimulus_raw = { // 用意した音声ファイル
  'x0.5' : './×0.5.mp3',
  'x0.6' : './×0.6.mp3',
  'x0.7' : './×0.7.mp3',
  'x0.8' : './×0.8.mp3',
  'x0.9' : './×0.9.mp3',
  'x1.0' : './×1.0.mp3',
  'x1.1' : './×1.1.mp3',
  'x1.2' : './×1.2.mp3',
  'x1.3' : './×1.3.mp3',
  'x1.4' : './×1.4.mp3',
  'x1.5' : './×1.5.mp3',
 } 

var experiment_A = {
  type: jsPsychAudioKeyboardResponse,
//  choices: "NO_KEYS",
  choices: "ALL_KEYS",
  trial_duration: 2000,
  stimulus: function () {return stimulus_raw['x1.0'];},
//  stimulus: function () {return stimulus_raw['x1.0'] ;},
  prompt: '<p style="font-size: 320px;">A</p>' ,
} ;

var answer = {
  type: jsPsychHtmlSliderResponse,
//  require_movement: true,
  labels: ['遅い', '同じ', '速い'],
  button_label: "次へ",
  stimulus: '<div align="left">\
  BはAに比べて、どのくらい速い/遅いですか？<br>\
どのくらい速い（または遅い）かを、ツマミを動かして回答してください。<br><br><br>\
',
  prompt:"<br><br>ボタンを押すと次の試行に進みます。<br><br>",
} ;


// ------------------------------------------------------------------------
// 問題の作成(練習)
// ------------------------------------------------------------------------
var experiment_B1 = {
  type: jsPsychAudioButtonResponse,
  stimulus: function () {return stimulus_raw['x0.5'] ;},
  prompt: '<p style="font-size: 320px;">B</p><br>ボタンを押すと回答画面に進みます。' ,
  choices: ["回答"],
} ;

var experiment_B2 = {
  type: jsPsychAudioButtonResponse,
  stimulus: function () {return stimulus_raw['x1.5'] ;},
  prompt: '<p style="font-size: 320px;">B</p><br>ボタンを押すと回答画面に進みます。' ,
  choices: ["回答"],
} ;

var trials_pre = {
  timeline: [],
};

// 出来上がった問題をtimelineにpush
trials_pre.timeline.push(experiment_A) ;
trials_pre.timeline.push(experiment_B1) ;
trials_pre.timeline.push(answer) ;
trials_pre.timeline.push(experiment_A) ;
trials_pre.timeline.push(experiment_B2) ;
trials_pre.timeline.push(answer) ;

trials_pre.timeline.push(instruction_p8) ;
trials_pre.timeline.push(instruction_p9) ;

// ------------------------------------------------------------------------
// 問題の作成(本番)
// ------------------------------------------------------------------------
// ここに各問題を格納
var trials = {
  timeline: [],
};

// 刺激
var varexam = [
  { index: 0,label: 'アクマ'   , select:["魔物","デーモン","天使"] },
  { index: 1,label: 'キアツ'   , select:["大気","圧力","天候"] },
  { index: 2,label: 'センイ'   , select:["闘志","布","医者"] },
  { index: 3,label: 'ハクイ'   , select:["医療従事者","化学研究","死に装束"] },
  { index: 4,label: 'ユカタ'   , select:["夏","入浴","和服"] },
  { index: 5,label: 'カラス'   , select:["黒色","鳥類","不吉"] },
  { index: 6,label: 'スルメ'   , select:["イカ","干物","おつまみ"] },
  { index: 7,label: 'コイン'   , select:["硬貨","金属","表裏"] },
  { index: 8,label: 'タヌキ'   , select:["だます","哺乳類","寝る"] },
  { index: 9,label: 'メマイ'   , select:["回る","忙しい","体調不良"] },
  { index:10,label: 'キリン'   , select:["首","哺乳類","神童"] },
  { index:11,label: 'エホン'   , select:["子ども","絵","物語"] },
  { index:12,label: 'シカイ'   , select:["進行役","眼","海"] },
  { index:13,label: 'ナマリ'   , select:["にぶる","金属","方言"] },
  { index:14,label: 'ユウヒ'   , select:["夕方","朝日","オレンジ"] },
  { index:15,label: 'カシワ'   , select:["植物","餅","縁起木"] },
  { index:16,label: 'サクラ'   , select:["植物","春","ピンク"] },
  { index:17,label: 'センス'   , select:["感覚","扇","夏"] },
  { index:18,label: 'ナイフ'   , select:["切る","料理","カトラリー"] },
  { index:19,label: 'モナカ'   , select:["菓子","名月","あんこ"] },
  ]  

// ランダマイズ
var sequence = [] ;
for (let i = 0; i< varexam.length; i++) {
  sequence[i] = i ;
}
for (let i = 0; i< varexam.length; i++) {
  target           =  Math.floor(Math.random() * varexam.length) ;
  tmpseq           = sequence[i] ;
  sequence[i]      = sequence[target] ;
  sequence[target] = tmpseq
}

// 配列から問題のペアを作成
for (let i = 0; i< varexam.length; i++) {
  // 単語を呈示
  var exam = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function () {return  "<p style='font-size: 48px;'>" + varexam[sequence[i]].label + "</p>"; },
    trial_duration: 2500, // 表示時間
    choices: "NO_KEYS",
  };
  // その単語の印象を選択
  var choiceone = {
  type: jsPsychSurveyMultiChoice,
  button_label: "次へ",
  questions: [
    {
      prompt: "この中から一番印象の強い単語を1つ選んでください。", 
      name: 'selectedword', 
      options: varexam[sequence[i]].select, 
      required: true,
      horizontal: false
    }, 
  ]
  };
  // 出来上がった問題をtimelineにpush
  trials.timeline.push(eyepoint) ;
  trials.timeline.push(exam) ;
  trials.timeline.push(choiceone) ;
}

// ------------------------------------------------------------------------
// 実験の開始
// ------------------------------------------------------------------------

//jsPsych.run([enter_fullscreen,exit_fullscreen]);
jsPsych.run([introduction,trials_pre,bye]);
