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
    jsPsych.data.get().localSave('csv', filename);
//    jsPsych.data.displayData();
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

var instruction_p3 = {
  type: jsPsychHtmlButtonResponse,
  stimulus: '<div align="left"><font size=6>\
練習<br>\
<br></font></div>\
',
choices: ['次へ'],
} ;

// 実験の終了
var bye = {
  type: jsPsychHtmlButtonResponse,
  stimulus: '<div align="left"><font size=6>\
以上で，本日の実験は終了となります。<br>\
ご協力ありがとうございました。<br>\
来週は「文字が認知に及ぼす影響」の実験を行う予定ですので，引き続きご協力いただけますと幸いです。<br>\
よろしくお願い致します。<br>\
<br>\
何かご不明な点等がございましたら，下記のメールアドレスまでご連絡ください。<br>\
<br></div><div  align="right">\
人間科学部心理学科<br>\
渡辺ゼミナール　4年<br>\
沼倉 日菜子<br>\
31900875＠tokiwa-u.jp<br>\
<br>\
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
// 問題の作成(練習)
// ------------------------------------------------------------------------
var trials_pre = {
  timeline: [],
};

// 刺激
var varexam_pre = [
  { index:0,label: 'コオリ'   , select:["冷たい","クール","冬"] },
  { index:1,label: 'サツキ'   , select:["五月","植物","アニメ"] },
  { index:2,label: 'レモン'   , select:["すっぱい","黄色","果物"] },
]  

// 配列から問題のペアを作成
for (let i = 0; i< varexam_pre.length; i++) {
  // 単語を呈示
  var exam_pre = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function () {return  "<p style='font-size: 48px;'>" + varexam_pre[i].label + "</p>"; },
    trial_duration: 2500, // 表示時間
    choices: "NO_KEYS",
  };
  // その単語の印象を選択
  var choiceone_pre = {
  type: jsPsychSurveyMultiChoice,
  button_label: "次へ",
  questions: [
    {
      prompt: "この中から一番印象の強い単語を1つ選んでください。", 
      name: 'selectedword', 
      options: varexam_pre[i].select, 
      required: true,
      horizontal: false
    }, 
  ]
  };
  // 出来上がった問題をtimelineにpush
  trials_pre.timeline.push(eyepoint) ;
  trials_pre.timeline.push(exam_pre) ;
  trials_pre.timeline.push(choiceone_pre) ;
}

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

//jsPsych.run([enter_fullscreen,par_id,hello,trials,bye,exit_fullscreen]);
jsPsych.run([enter_fullscreen,instruction_p1,instruction_p2,trials_pre,par_id,trials,bye,exit_fullscreen]);
