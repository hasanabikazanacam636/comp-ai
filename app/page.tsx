"use client";

import { useState } from "react";

export default function Home() {
  const [video, setVideo] = useState<File | null>(null);
  const [photos, setPhotos] = useState<File[]>([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [number, setNumber] = useState("");
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Bekleniyor...");
  const [completed, setCompleted] = useState(false);

  const handleCreateComp = () => {
    if (!video || photos.length === 0 || !firstName || !lastName) {
      alert("Lütfen video, oyuncu fotoğrafı, ad ve soyad bilgilerini doldur.");
      return;
    }

    setCompleted(false);
    setProgress(0);
    setStatus("Video analiz ediliyor...");

    let current = 0;

    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 8) + 2;

      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setStatus("Comp hazır!");
        setCompleted(true);
      } else if (current < 25) {
        setStatus("Video yükleniyor...");
      } else if (current < 50) {
        setStatus("Oyuncu aranıyor...");
      } else if (current < 75) {
        setStatus("Maç taranıyor...");
      } else {
        setStatus("Önemli pozisyonlar çıkarılıyor...");
      }

      setProgress(current);
    }, 700);
  };

  return (
    <main className="min-h-screen bg-[#07101f] text-white">
      {/* HEADER */}
      <header className="border-b border-white/5 bg-[#0b1628]/90">
        <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-6 lg:px-10">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Claser Comp Maker</h1>
            <p className="text-xs font-medium tracking-[0.25em] text-cyan-400">
              POWERED BY CLASER
            </p>
          </div>

          <div className="hidden rounded-full border border-white/10 bg-[#111e33] px-5 py-2 text-sm text-slate-300 md:block">
            Claser Comp Maker
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <div className="mx-auto grid max-w-[1500px] gap-6 px-5 py-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:px-10">
        
        {/* LEFT */}
        <section className="rounded-2xl border border-white/10 bg-[#0d192c] p-5 shadow-2xl">
          
          {/* VIDEO */}
          <div className="mb-7">
            <div className="mb-3">
              <h2 className="text-sm font-bold text-slate-200">
                1. Maç Videosu
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                MP4, MOV, TS, MKV, AVI — maksimum 30 GB
              </p>
            </div>

            <label className="group flex min-h-[120px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-600 bg-[#091426] transition hover:border-cyan-400/70 hover:bg-[#0b1930]">
              <input
                type="file"
                accept=".mp4,.mov,.ts,.mkv,.avi,video/*"
                className="hidden"
                onChange={(e) => setVideo(e.target.files?.[0] || null)}
              />

              <div className="mb-2 text-3xl text-cyan-400">▣</div>

              <span className="text-sm font-medium text-slate-300">
                {video ? video.name : "Video seçmek için tıkla"}
              </span>

              {video && (
                <span className="mt-1 text-xs text-slate-500">
                  {(video.size / (1024 * 1024)).toFixed(1)} MB
                </span>
              )}
            </label>
          </div>

          {/* PHOTOS */}
          <div className="mb-7">
            <div className="mb-3">
              <h2 className="text-sm font-bold text-slate-200">
                2. Oyuncu Fotoğrafları
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                En az 1 fotoğraf gerekli — birden fazla fotoğraf seçebilirsin
              </p>
            </div>

            <label className="group flex min-h-[110px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-600 bg-[#091426] transition hover:border-cyan-400/70 hover:bg-[#0b1930]">
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) =>
                  setPhotos(e.target.files ? Array.from(e.target.files) : [])
                }
              />

              <div className="mb-2 text-3xl text-cyan-400">♙</div>

              <span className="text-sm font-medium text-slate-300">
                {photos.length > 0
                  ? `${photos.length} fotoğraf seçildi`
                  : "Fotoğraf(lar) seçmek için tıkla"}
              </span>
            </label>
          </div>

          {/* PLAYER INFO */}
          <div className="mb-7">
            <div className="mb-3">
              <h2 className="text-sm font-bold text-slate-200">
                3. Oyuncu Bilgileri
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Oyuncunun doğru tespit edilmesine yardımcı olur
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Ad"
                className="h-12 rounded-xl border border-white/10 bg-[#091426] px-4 text-sm outline-none placeholder:text-slate-600 focus:border-cyan-400"
              />

              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Soyad"
                className="h-12 rounded-xl border border-white/10 bg-[#091426] px-4 text-sm outline-none placeholder:text-slate-600 focus:border-cyan-400"
              />
            </div>

            <input
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="Forma Numarası"
              inputMode="numeric"
              className="mt-3 h-12 w-full rounded-xl border border-white/10 bg-[#091426] px-4 text-sm outline-none placeholder:text-slate-600 focus:border-cyan-400"
            />
          </div>

          {/* BUTTON */}
          <button
            onClick={handleCreateComp}
            disabled={progress > 0 && progress < 100}
            className="flex h-14 w-full items-center justify-center rounded-xl bg-cyan-500 text-sm font-bold tracking-wide text-[#04101c] transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {progress > 0 && progress < 100
              ? "COMP OLUŞTURULUYOR..."
              : "✦  COMP OLUŞTUR"}
          </button>

          {/* INFO */}
          <div className="mt-5 rounded-xl border border-white/5 bg-[#101e34] p-4">
            <p className="text-xs leading-6 text-slate-400">
              <span className="font-bold text-cyan-400">
                Video her saniyesi taranır.
              </span>{" "}
              Uzun maçlarda bu işlem biraz sürebilir. Sistem, yüklediğin
              oyuncu fotoğraflarını kullanarak oyuncuyu maç boyunca tespit
              etmeye çalışır ve önemli pozisyonları analiz eder. Bulunan
              pozisyonların öncesinden birkaç saniye eklenerek comp klipleri
              oluşturulur.
            </p>
          </div>
        </section>

        {/* RIGHT */}
        <section className="flex flex-col gap-5">
          
          {/* PROGRESS */}
          <div className="rounded-2xl border border-white/10 bg-[#0d192c] p-5 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-bold text-slate-300">
                {status}
              </span>

              <span className="text-sm font-bold text-cyan-400">
                {progress}%
              </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-[#172640]">
              <div
                className="h-full rounded-full bg-cyan-400 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* AI CONSOLE */}
          <div className="min-h-[390px] overflow-hidden rounded-2xl border border-white/10 bg-[#050b15] shadow-2xl">
            <div className="flex h-12 items-center gap-2 border-b border-white/5 bg-[#080f1b] px-5">
              <span className="h-3 w-3 rounded-full bg-red-500" />
              <span className="h-3 w-3 rounded-full bg-cyan-400" />
              <span className="h-3 w-3 rounded-full bg-slate-600" />

              <span className="ml-3 font-mono text-xs text-slate-500">
                comp-ai-core — v1.0
              </span>
            </div>

            <div className="p-6 font-mono text-xs leading-7 text-slate-500">
              <p className="text-cyan-400">
                &gt; Comp AI çekirdeği hazır.
              </p>

              {progress === 0 && (
                <p>&gt; Video ve oyuncu fotoğrafı bekleniyor...</p>
              )}

              {progress > 0 && (
                <>
                  <p>&gt; Video: {video?.name}</p>
                  <p>&gt; Oyuncu: {firstName} {lastName}</p>
                  <p>&gt; Forma: #{number || "?"}</p>

                  <p className="mt-4 text-cyan-400">
                    &gt; {status}
                  </p>

                  {progress >= 50 && (
                    <p className="text-slate-400">
                      &gt; Oyuncu görüntüleri analiz ediliyor...
                    </p>
                  )}

                  {progress >= 75 && (
                    <p className="text-slate-400">
                      &gt; Önemli pozisyonlar tespit ediliyor...
                    </p>
                  )}

                  {progress === 100 && (
                    <p className="mt-3 text-green-400">
                      &gt; Comp başarıyla oluşturuldu.
                    </p>
                  )}
                </>
              )}
            </div>
          </div>

          {/* RESULT */}
          <div className="rounded-2xl border border-white/10 bg-[#0d192c] p-5 shadow-2xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400">
                ✦
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-200">
                  Tespit Edilen Sahneler
                </h3>
                <p className="text-xs text-slate-500">
                  {progress === 0
                    ? "Henüz tarama yapılmadı."
                    : progress < 100
                    ? "Sahneler analiz ediliyor..."
                    : "Comp içerisindeki sahneler hazır."}
                </p>
              </div>
            </div>

            {progress === 100 && (
              <button
                onClick={() => alert("Gerçek video indirme sistemi sonraki aşamada bağlanacak.")}
                className="flex h-12 w-full items-center justify-center rounded-xl bg-white text-sm font-bold text-[#07101f] transition hover:bg-slate-200"
              >
                ↓ &nbsp; COMP'U İNDİR
              </button>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}