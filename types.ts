export interface Pesanan {
  id_pesanan?: string;
  layanan: string;
  nama_pelanggan: string;
  jumlah_pakaian: number;
  status_pembayaran: string;
  tanggal: string;
  total_harga: number;
  status: string;
}

export interface Layanan {
  id_layanan: number;
  nama_layanan: string;
  estimasi_waktu: number;
  deskripsi_layanan: string;
  harga: number;
}

export interface Laporan {
  id_laporan: number;
  tanggal_laporan: string;
  total_pendapatan: number;
  jumlah_pesanan: number;
}
